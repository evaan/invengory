package main

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"

	"google.golang.org/api/idtoken"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func GetWhoAmI(w http.ResponseWriter, r *http.Request) {
	type UserJSON struct {
		FullName              string   `json:"full_name"`
		Email                 string   `json:"email"`
		GoogleProfilePhotoURL string   `json:"google_profile_photo_url"`
		Permissions           []string `json:"permissions"`
	}

	user := r.Context().Value("user")

	var permissions []string

	if user != nil {
		w.Header().Set("Content-Type", "application/json")
		err = db.Model(&Permission{}).Where("user_id = ?", user.(*User).ID).Pluck("permission", &permissions).Error
		if err != nil {
			permissions = []string{}
		}

		json.NewEncoder(w).Encode(&UserJSON{
			FullName:              user.(*User).FullName,
			Email:                 user.(*User).Email,
			GoogleProfilePhotoURL: user.(*User).GoogleProfilePhotoURL,
			Permissions:           permissions,
		})
	} else {
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte("{\"error\":\"Not Authenticated.\"}"))
	}
}

func PostGoogleToken(w http.ResponseWriter, r *http.Request) {
	type TokenInfo struct {
		Credential string `json:"credential"`
	}

	// Decode JSON to LoginInfo
	var token_info TokenInfo
	err := json.NewDecoder(r.Body).Decode(&token_info)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	payload, err := idtoken.Validate(
		context.Background(),
		token_info.Credential,
		"704337629590-gtncj62j5tpnkn9mg8h6amsn84al14lc.apps.googleusercontent.com", // TODO: make a config for this
	)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest) // TODO: don't actually return the message
		return
	}

	claims_email := payload.Claims["email"].(string)

	// Lookup User
	var user User
	var result *gorm.DB
	result = db.Where("email = ?", claims_email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			// do something special if user is not in db
		}

		http.Error(w, "{\"error\":\"User could not be found.\"}", http.StatusBadRequest) // TODO: personalized message in env?
		return
	}

	logger.Println(payload.Claims)

	db.Model(&user).Updates(User{
		FullName:              payload.Claims["name"].(string),
		GoogleProfilePhotoURL: payload.Claims["picture"].(string),
	})

	// At this point, we have a real user, create their session
	session := Session{
		User: &user,
		// Token: GenerateSecureToken(32),
		Token: GenerateSecureToken(32),
	}

	result = db.Create(&session)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			logger.Println("Generated Duplicate Token")
		}

		http.Error(w, "Error Generating Token", http.StatusBadRequest) // TODO: don't actually return the message
		return
	}

	// We've created a session in the DB, set the users cookie
	session_cookie := http.Cookie{
		Name:     "sessiontoken",
		Value:    session.Token,
		Path:     "/",
		MaxAge:   86400,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}

	http.SetCookie(w, &session_cookie)

	type JSONResponse struct {
		Authenticated bool `json:"authenticated"`
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(&JSONResponse{
		Authenticated: true,
	})
}

func GetParts(w http.ResponseWriter, r *http.Request) {
	type PartWithStock struct {
		ID         int    `json:"id"`
		Name       string `json:"name"`
		CategoryID int    `json:"categoryID"`
		TotalStock int    `json:"totalStock"`
	}

	// type PartsJSONResponse struct {
	// 	Parts []PartWithStock `json:"parts"`
	// }

	var parts []PartWithStock
	db.Raw("SELECT p.*, SUM(pl.stock) AS total_stock FROM parts p LEFT JOIN part_locations pl ON p.id = pl.part_id GROUP BY p.id, p.name;").Scan(&parts)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(parts)
}

func GetCategories(w http.ResponseWriter, r *http.Request) {
	var categories []Category
	db.Where("parent_id IS NULL").Preload(clause.Associations, recursive_preload).Find(&categories)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(&categories)
}

func recursive_preload(d *gorm.DB) *gorm.DB {
	return d.Preload(clause.Associations, recursive_preload)
}

func PostLogout(w http.ResponseWriter, r *http.Request) {
	// Server-side
	// TODO

	// Client
	session_cookie := http.Cookie{
		Name:     "sessiontoken",
		Value:    "",
		Path:     "/",
		MaxAge:   86400,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}

	http.SetCookie(w, &session_cookie)
}

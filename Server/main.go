package main

import (
	"fmt"
	"log"
	"net/http"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB
var err error
var logger *log.Logger

func main() {
	logger = log.Default()
	fmt.Println("👋 InventGory Server")
	db, err = gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		logger.Fatal("Could not connect to DB")
	}

	db.AutoMigrate(&Part{})
	db.AutoMigrate(&Location{})
	db.AutoMigrate(&PartLocation{})
	db.AutoMigrate(&Catagory{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Session{})

	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/auth/whoami", GetWhoAmI)
	mux.HandleFunc("POST /api/auth/google_token", PostGoogleToken)
	mux.HandleFunc("POST /api/auth/logout", PostLogout)

	mux.HandleFunc("GET /api/parts", GetParts)
	mux.HandleFunc("GET /api/catagories", GetCatagories)

	wrappedMux := NewAuthMiddleware(mux)
	wrappedMux2 := NewCORSMiddleware(wrappedMux)

	fmt.Println("Serving on http://localhost:8099")
	http.ListenAndServe("0.0.0.0:8099", wrappedMux2)

}

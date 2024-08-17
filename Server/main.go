package main

import (
	"fmt"
	"log"
	"net/http"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB
var err error
var logger *log.Logger

func main() {
	logger = log.Default()
	fmt.Println("👋 Invengory Server")
	db, err = gorm.Open(postgres.Open("postgresql://postgres:admin@192.168.4.3:5432/invengory"), &gorm.Config{})
	if err != nil {
		logger.Fatal("Could not connect to DB")
	}

	db.AutoMigrate(&Part{})
	db.AutoMigrate(&Location{})
	db.AutoMigrate(&PartLocation{})
	db.AutoMigrate(&Category{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Session{})
	db.AutoMigrate(&Permission{})

	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/auth/whoami", GetWhoAmI)
	mux.HandleFunc("POST /api/auth/google_token", PostGoogleToken)
	mux.HandleFunc("POST /api/auth/logout", PostLogout)

	mux.HandleFunc("GET /api/parts", GetParts)
	mux.HandleFunc("GET /api/categories", GetCategories)

	wrappedMux := NewAuthMiddleware(mux)
	wrappedMux2 := NewCORSMiddleware(wrappedMux)

	fmt.Println("Serving on http://localhost:8099")
	http.ListenAndServe("0.0.0.0:8099", wrappedMux2)

}

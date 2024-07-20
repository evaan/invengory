package main

import (
	"context"
	"net/http"
)

type AuthMiddleware struct {
	handler http.Handler
}

func (m *AuthMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	session_cookie, err := r.Cookie("sessiontoken")
	if err != nil {
		m.handler.ServeHTTP(w, r)
		return
	}

	var session Session
	result := db.Where("token = ?", session_cookie.Value).Preload("User").First(&session)
	if result.Error != nil {
		m.handler.ServeHTTP(w, r)
		return
	}

	if session_cookie.Value == "" {
		logger.Println("Session Token is Empty")
	}

	logger.Println(session_cookie.Value, session)

	ctx := r.Context()
	req := r.WithContext(context.WithValue(ctx, "user", session.User))
	*r = *req // replace request with new request with added context

	m.handler.ServeHTTP(w, r)
}

func NewAuthMiddleware(next http.Handler) *AuthMiddleware {
	return &AuthMiddleware{next}
}

type CORSMiddleware struct {
	handler http.Handler
}

func (m *CORSMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	m.handler.ServeHTTP(w, r)
}

func NewCORSMiddleware(next http.Handler) *CORSMiddleware {
	return &CORSMiddleware{next}
}

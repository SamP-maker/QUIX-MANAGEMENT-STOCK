package middleware

import (
	"context"
	"net/http"
	"strings"
	"stock-management-server/helpers"
)

func JWTMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header missing", http.StatusUnauthorized)
			return
		}

		tokenString := strings.TrimSpace(strings.Replace(authHeader, "Bearer", "", 1))
		claims, msg := helpers.ValidateTokens(tokenString)
		if msg != "" {
			http.Error(w, msg, http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), "user", claims)
		next.ServeHTTP(w, r.WithContext(ctx))

	})
}

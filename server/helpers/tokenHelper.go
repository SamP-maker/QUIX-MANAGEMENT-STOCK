package helpers

import (
	"database/sql"
	"fmt"
	"log"

	"os"

	"time"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
)

type ContextKey string

const UserContextKey ContextKey = "user"

type SignedDetails struct {
	EID        string
	First_name string
	Last_name  string
	Uid        string
	jwt.StandardClaims
}

var SECRET_KEY string = os.Getenv("SECRET_KEY")

func GenerateAllTokens(EId string, firstName string, lastName string, UID string) (signedToken string, signedRefreshToken string, err error) {
	claims := &SignedDetails{

		EID:        EId,
		First_name: firstName,
		Last_name:  lastName,
		Uid:        UID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	}

	refreshClaims := &SignedDetails{

		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 168).Unix(),
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SECRET_KEY))
	if err != nil {
		log.Panic(err)
		return
	}

	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(SECRET_KEY))
	if err != nil {
		log.Panic(err)
		return
	}

	return token, refreshToken, nil

}

func UpdateAllTokens(db *sql.DB, signedToken, signedRefreshToken, userId string) error {
	updateObj := map[string]interface{}{
		"token":         signedToken,
		"refresh_token": signedRefreshToken,
		"updated_at":    time.Now(),
	}

	query := "UPDATE users SET token=?, refresh_token=?, updated_at=? WHERE user_id=?"
	_, err := db.Exec(query, updateObj["token"], updateObj["refresh_token"], updateObj["updated_at"], userId)
	if err != nil {
		log.Panic((err))
		return err
	}

	return nil
}

func ValidateTokens(signedToken string) (claims *SignedDetails, msg string) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&SignedDetails{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(SECRET_KEY), nil
		},
	)

	if err != nil {
		msg = fmt.Sprintf("the token is invalid: %v", err)
		return
	}

	claims, ok := token.Claims.(*SignedDetails)
	if !ok {
		msg = fmt.Sprintf("the token is invalid")
		return
	}

	if claims.ExpiresAt < time.Now().Unix() {
		msg = "token is expired"
		return
	}

	return claims, ""
}

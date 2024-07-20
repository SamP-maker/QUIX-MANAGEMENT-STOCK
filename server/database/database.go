package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Connect() {
	dsn := "root:954632perrylarryberry1<3@tcp(127.0.0.1:3306)/quix"
	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		fmt.Printf("Error opening database: %v\n", err)
		panic(err)
	}

	err = DB.Ping()
	if err != nil {
		fmt.Printf("Error opening database: %v\n", err)
		panic(err)
	}
	fmt.Println("Connected to DB")
}

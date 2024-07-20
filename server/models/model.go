package models

type User struct {
	EID        string `json:"eid"`
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
	Uid        string `json:"uid"`
	// Add other fields as needed
}

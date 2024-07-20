package main

// db.AutoMigrate(&Part{})
// db.AutoMigrate(&Location{})
// db.AutoMigrate(&PartLocation{})
// db.AutoMigrate(&Catagory{})
// db.AutoMigrate(&User{})
// db.AutoMigrate(&Session{})

// db.Save(&User{
// 	Username: "evanvokey",
// })

// root_catagory := Catagory{
// 	Name: "Root Catagory",
// }

// db.Save(&root_catagory)

// db.Save(&Catagory{
// 	Name:   "Electrical Components",
// 	Parent: &root_catagory,
// })

// db.Save(&Catagory{
// 	Name:   "Mechanical Parts",
// 	Parent: &root_catagory,
// })

type User struct {
	ID                    int    `gorm:"primaryKey;autoIncrement"`
	FullName              string `gorm:"not null"`
	Email                 string `gorm:"not null"`
	GoogleProfilePhotoURL string
}

type Session struct {
	ID     int    `gorm:"primaryKey;autoIncrement"`
	Token  string `gorm:"not null;unique"`
	User   *User  `gorm:"not null"`
	UserID int    `gorm:"TYPE:integer REFERENCES users"`
}

type Part struct {
	ID         int      `gorm:"primaryKey;autoIncrement"`
	Name       string   `gorm:"not null"`
	Catagory   Catagory `gorm:"not null"`
	CatagoryID int
}

type Location struct {
	ID       int    `gorm:"primaryKey;autoIncrement"`
	Name     string `gorm:"not null"`
	Parent   *Location
	ParentId int `gorm:"TYPE:integer REFERENCES locations"`
}

type PartLocation struct {
	PartID     int `gorm:"primaryKey"`
	LocationID int `gorm:"primaryKey"`
	Stock      int `gorm:"not null"`
}

type Catagory struct {
	ID              int    `gorm:"primaryKey;autoIncrement"`
	Name            string `gorm:"not null"`
	ParentID        int
	ChildCatagories []Catagory `gorm:"foreignkey:ParentID"`
}

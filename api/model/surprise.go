package model

// Surprise represents a list of books for the surprise functionality
type Surprise struct {
	Books []string `json:"books"`
	Type  string   `json:"surprise_type"`
}

// RecommendedSurprise - a set of recommended books
var RecommendedSurprise = Surprise{
	Books: []string{
		"I6iaDAAAQBAJ", // Tools of Titans
		"aeJzAgAAQBAJ", // Island of Knowledge
		"sxVHDwAAQBAJ", // 12 Rules for Life
		"yRaMDAEACAAJ", // Simple Path To Wealth
		"K2AvZmco3E0C", // Man's Search For Meaning
		"_gA_DwAAQBAJ", // Surely You're Joking, Mr. Feynman!
		"xm58YGKUUl4C", // The Lessons of History
		"QwJ7vgAACAAJ", // RIch Dad Poor Dad
		"O1MInVXd_aoC", // The Power of Habit
	},
	Type: "Recommended by Adam",
}

// PopularSurprise - a set of popular books
var PopularSurprise = Surprise{
	Books: []string{
		"FICLzcp22b8C", // Don Quixote
		"YqfPAAAAMAAJ", // A Tale of Two Cities
		"geAU_jMC7UUC", // The Lord of the Rings
		"mTxbDwAAQBAJ", // The Little Prince
		"39iYWTb6n6cC", // Harry Potter
		"ACMYLqk_7GoC", // And Then There Were None
		"AjIWAAAAYAAJ", // Alice’s Adventures in Wonderland
		"L43FAF0Ynr8C", // The Lion, The Witch and the Wardrobe
		"A91urgEACAAJ", // The Alchemist
	},
	Type: "Most Popular",
}

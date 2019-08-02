const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const today = new Date(Date.now()).toISOString();
const this_week = new Date(Date.now() - 5 * _MS_PER_DAY).toISOString();
// const yesterday = new Date(Date.now() - 1* _MS_PER_DAY).toISOString();
// const this_month = new Date(Date.now() - 15 * _MS_PER_DAY).toISOString();

export const SampleUser = {
    "id": 0,
    "type": "sample_user",
    "first_name": "Sample",
    "email": "sample@bookcase.com",
    "password": "hf2eC9uvVYZ-miWL3MjczKACUta4ZvepuJmyn7I3KEv_LaZNGzvGTc1Uc8DN0Ij--0tSHLC0kFawbaOSfjadVg==",
    "last_login": "2019-08-02T10:37:07.688034-04:00",
    "recent_searches": [],
    "library": {
      "to_read_list": [
        "p9XrAAAAMAAJ",
        "A5moyserOFIC",
        "2OCKrF6YNKEC"
      ],
      "read_list": [
        {
          "id": "xm58YGKUUl4C",
          "reading_now": false,
          "favorite": false,
          "closing_thoughts": {
            "review": "Yeah!!",
            "rating": 5
          },
          "book_summary": "",
          "lessons": [
            {
              "title": "Interesting Lesson",
              "description": "THIS WAS NEAT",
              "reference": "Page 1",
              "highlight": false
            }
          ],
          "section_notes": [],
          "last_updated": today
        },
        {
            "id": "lA48AQAAIAAJ",
            "reading_now": true,
            "favorite": false,
            "closing_thoughts": {
              "review": "",
              "rating": 0
            },
            "book_summary": "",
            "lessons": [],
            "section_notes": [],
            "last_updated": this_week
          }
      ]
    }
  }
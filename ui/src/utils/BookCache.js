export class BookCache {
    constructor() {
      this.cache = this.getBookCache();
    }
  
    getBookCache = () => {
      var bookCache = JSON.parse(localStorage.getItem("book_cache"));
      if(bookCache != null) {
        if(Array.isArray(bookCache)){
          return bookCache;
        } 
      }
      return [];
    }
  
    addBooksToCache = books => {
      var bookCache = this.getBookCache();
      var count = 0;
      books.forEach(book => {
        if(!this.checkBookInList(book.BookID, bookCache)) {
          bookCache.push(book);
          count++;
        }
      });
  
      if(count > 0){
        localStorage.setItem("book_cache", JSON.stringify(bookCache));
        this.cache = bookCache;
      }
    }
  
    getBookFromCache = bookID => {
      for(var i = 0; i < this.cache.length; i++) {
        if(this.cache[i].BookID === bookID) {
          return this.cache[i]
        }
      }
      return null;
    }
  
    checkBookInList = (bookID, books) => {
      for(var i = 0; i < books.length; i++) {
        if(books[i].BookID === bookID) {
          return true
        }
      }
      return false;
    }
  }
  
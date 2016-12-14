export const Constants = {
    key : "BbcNews",
    pages: { 
        home: { 
            name: "Home",
            content: "../pages/home/home.html",
            module: "/home/home"
        },
        news: { 
            name: "News",
            content: "../pages/news/news.html",
            module: "/news/news"
        },
        archive: { 
            name: "Archive",
            content: "../pages/archive/archive.html",
            module: "/archive/archive"
        },
        login: { 
            name: "Login",
            content: "../pages/login/login.html",
            module: "/login/login"
        },
        navigator: { 
            name: "Navigator",
            content: "../pages/partial/navigator/navigator.html",
            module: "/partial/navigator/navigator"
        }
    },
    database: "mongodb://localhost:27017/newsdb"
}

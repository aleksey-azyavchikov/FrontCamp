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
        },
        students: {
            name: "Students",
            content: "../pages/students/students.html",
            module: "/students/students"
        }
    },
    apiServer: "http://localhost:3001",
    apiEndPoints: {
        news: "/news",
        grades: "/grades",
        bestclass: "/bestclass"
    },
    database: "mongodb://localhost:27017/newsdb"
}

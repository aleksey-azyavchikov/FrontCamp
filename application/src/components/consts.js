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
        },
        editor: {
            name: "Editor",
            content: "../pages/partial/editor/editor.html",
            module: "/partial/editor/editor"
        },
        footer: {
            name: "Footer",
            content: "../pages/partial/footer/footer.html",
            module: "/partial/footer/footer"
        },
        brand: {
            name: "Brand",
            content: "../pages/partial/brand/brand.html",
            module: "/partial/brand/brand"
        },
        base: {
            name: "Base",
            content: "../pages/base/base.html",
            module: "/base/base"
        }
    },
    apiServer: "http://localhost:3001",
    apiEndPoints: {
        get: {
            news: "/news",
            grades: "/grade",
            bestclass: "/grade/bestclass"
        },
        post: {
            news: {
                article: "/news/article"
            }
        }
    },
    database: "mongodb://localhost:27017/newsdb"
}

export let PageEnum = {
    News: "News",
    Archive: "Archive",
    Student: "Students",
    Editor: "Editor",
}
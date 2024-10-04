export const themes = {
    principal:{
        button:{
            success:"#ff5e61",
            cancel:'red'
        },

        color:{
            primary:'#78965A',//'#ff5e61',//'#AA00FF',
            primaryDark:'red',//'#4A148C',
            primaryLight: '#F8BBD0',//'#CE93D8',
            accentColor: '#ff5e61',
            danger:'#df4759',
            success: '#42ba96',
            backgroundCardDark: 'red',
            backgroundCardLight:'red'
        },
        text:{
            color:{
                primary:'#FFFFFF',
                primaryDark:'#4A148C',
                primaryLight:'#CE93D8',
                secondary:'#e60250'
            },
            normal:{
                fontSize:16,
                fontFamily: "Roboto-Light"
            },
            title:{
                fontSize:20,
                fontFamily: "Roboto-Light"
            }
        }
    }
}

const themeConfig = {
    current: themes.principal,
    setTheme(theme){
        this.current = theme;
    }
}

export default themeConfig;
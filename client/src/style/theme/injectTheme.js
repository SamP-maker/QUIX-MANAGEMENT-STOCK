import theme from './theme';

const injectGlobalStyles = () => {
    const root = document.documentElement;
    root.style.setProperty('--Black', theme.colors.Black);
    root.style.setProperty('--Blue', theme.colors.Blue);
    root.style.setProperty('--White', theme.colors.White);
    root.style.setProperty('--LightBlue', theme.colors.LightBlue);
    root.style.setProperty('--LightRed', theme.colors.LightRed);
    root.style.setProperty('--Red', theme.colors.Red);
    root.style.setProperty('--Grey', theme.colors.Grey);
    root.style.setProperty('--LightGrey', theme.colors.LightGrey);
    root.style.setProperty('--LightYellow', theme.colors.Yellow);
    root.style.setProperty('--DarkYellow', theme.colors.DarkYellow);
    root.style.setProperty('--LightGreen', theme.colors.LightGreen);
    root.style.setProperty('--Green', theme.colors.Green);
    
    


};

export default injectGlobalStyles;
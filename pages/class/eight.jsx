import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChooseCorrectAnswer from "../../components/games/ChooseCorrectAnswer";


const EightClass = (props) => {
    /*
    TODO -> how to render class game list?
    TODO -> getting game props from database?
    TODO -> !!! game lazy load implementation !!!
     */

    return (
        <>
            <CustomHead
                title={'MU - osmá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main>
                <NavBar />
                <div className={'container-fluid'}>
                    <h1>osmá třída</h1>
                    <ChooseCorrectAnswer
                        question={'Kolik je 1+1?'} answers={['1', '3', '6', '2', '0', '10', '30']} correctAnswer={'2'} helperText={'Podívej se na internet!!!'} equation={null}
                    />
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default EightClass
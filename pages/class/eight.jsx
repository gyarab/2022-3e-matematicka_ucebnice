import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic'
import {Suspense} from "react";
import LoadingSpinner from "../../components/utils/LoadingSpinner";

const ChooseCorrectAnswer = dynamic(() => import('../../components/games/ChooseCorrectAnswer'), {
    suspense: true
})

const EightClass = (props) => {
    /*
    TODO -> how to render class game list?
    TODO -> getting game props from database?
     */

    return (
        <>
            <CustomHead
                title={'MU - osmá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main>
                <NavBar
                    activeRoute={'/class/eight'}
                    imgPath={'/android-chrome-512x512.png'}
                />
                <div className={'container-fluid'}>
                    <h1>osmá třída</h1>
                    <Suspense fallback={<LoadingSpinner/>}>
                        <ChooseCorrectAnswer
                            question={'Kolik je 1+1?'}
                            answers={['1', '3', '6', '2', '0', '10', '30']}
                            correctAnswer={'2'}
                            helperText={'Podívej se na internet!!!'}
                            equation={null}
                        />
                    </Suspense>
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default EightClass
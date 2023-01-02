import Image from "next/image";
import heroImageStyles from '../../styles/HeroImage.module.css'

/**
 * HERO IMAGE
 *
 * - this component renders hero image container
 * - image and description are optional based on props
 *
 * @type {string}
 * @param imagePath
 *
 * @type {string}
 * @param altText
 *
 * @type {string}
 * @param description
 *
 * @returns {JSX.Element}
 * @constructor
 */
const HeroImage = ({imagePath, altText, description}) => {
    return (
        <div className={heroImageStyles.container}>
            <div className={`${heroImageStyles.descriptionContainer} d-flex justify-content-center align-items-center`}>
                <h1 className={`${heroImageStyles.description} rounded p-3`}>
                    {description}
                </h1>
            </div>

            <div className={heroImageStyles.imgContainer}>
                <Image
                    alt={altText}
                    src={imagePath}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </div>
        </div>
    )
}

export default HeroImage
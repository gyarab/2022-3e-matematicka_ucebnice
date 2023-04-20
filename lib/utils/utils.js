export const isEmpty = (variable, required) => {
    return !variable || typeof variable !== required;
}
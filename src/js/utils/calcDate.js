export default function calcDate(day){
    const today = new Date().getTime()    
    const calcDay = (today - day * 24 * 3600 * 1000)
    const date = new Date(calcDay);
    return date ;
}


const useLocalStorage = (data) => {
    
    
    
    if (data?.fields?.length > 0 ) {
        
    const dataToSave = {
        fields:data.fields,
        thankYouScreen:data.thankyou_screens,
        title:data.title,
        welcomeScreens: data.welcome_screens
    }
    localStorage.setItem("myData",JSON.stringify(dataToSave))
}



return [JSON.parse(localStorage.getItem("myData"))]
}

export default useLocalStorage

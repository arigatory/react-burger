import React, { useState, useEffect } from 'react';
import hardcodedData from '../utils/data';

const useIngredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const url = 'https://norma.nomoreparties.space/api/ingredients';

    useEffect(() => {
        try {
            getData(url);
        }
        catch (e) {
            setIngredients(hardcodedData);
        }
    }, []);

    const getData = async (url) => {
        try {
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();
                setIngredients(json.data);
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
        }
        catch (e) {
            console.log(e);
            setIngredients(hardcodedData);
        }
    }

    return ingredients;
};

export default useIngredients;

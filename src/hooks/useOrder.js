import React, { useState, useEffect, useContext } from 'react';
import { SelectedIngredientsContext } from '../services/selectedIngredientsContext';

const useOrder = () => {
    const url = 'https://norma.nomoreparties.space/api/orders';
    const [selectedIngredients] = useContext(SelectedIngredientsContext);
    const [order, setOrder] = useState({});

    useEffect(() => {
        const selectedIds = selectedIngredients.map((ingredient) => {
            return (ingredient._id);
        });
        if (Array.isArray(selectedIds) && selectedIds.length) {
            try {
                getData(url, selectedIds);
            }
            catch (e) {
                setOrder({});
            }
        }
    }, [selectedIngredients]);

    const getData = async (url, ids) => {
        try {
            const body = {
                ingredients: ids
            };
            let response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                });
            if (response.ok) {
                setOrder((await response.json()).order);
            }
        }
        catch (e) {
            console.log(e);
            setOrder({});
        }
    }

    return () => { return order };
};

export default useOrder;

import { useState, useEffect, useContext } from 'react';
import { SelectedIngredientsContext } from '../services/selectedIngredientsContext';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const useOrder = () => {
    const [selectedIngredients] = useContext(SelectedIngredientsContext);
    const [order, setOrder] = useState({});

    useEffect(() => {
        const selectedIds = selectedIngredients.map((ingredient) => {
            return (ingredient._id);
        });
        if (Array.isArray(selectedIds) && selectedIds.length) {
            fetchOrder(selectedIds);
            setOrder({});
        }
    }, [selectedIngredients]);

    const fetchOrder = async (ids) => {
        try {
            const body = {
                ingredients: ids
            };
            let response = await fetch(`${BURGER_API_URL}/orders`,
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
            setOrder({});
        }
    }

    return order ;
};

export default useOrder;

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';

// import './singlePage.scss';

const SinglePage = ({Component, dataType}) => {

    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComics, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {

        updateData();
    }, [id])

    const updateData = () => {

        clearError();

        switch (dataType) {

            case 'comics':
                getComics(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
        }
    }

    const onDataLoaded = (data) => {

        setData(data);
    }

    return (

        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    );
}

export default SinglePage;
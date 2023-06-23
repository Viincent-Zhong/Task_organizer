import React, { useState } from 'react';
import { ICategory } from '../services/Category';
import { Modal, noPropagation } from './Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../data/store';

export const CategoryListModal = ({categories, handleAddCat, handleDeleteCat, handleModCat} : {categories : ICategory[], handleAddCat: (id: ICategory) => void, handleDeleteCat: (id: string) => void, handleModCat: (id: string, name: string) => void}) => {
    return (
        <div className="col-sm-1 col-md-1 col-lg-1">
            <div className="tab-parent">
                <div className="tab-bg-parent scroller">
                    {categories.map((cat: ICategory, index: number) => (
                        <h1>{cat.name}</h1>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const CategoryList = ({categories, handleAddCat, handleDeleteCat, handleModCat} : {categories : ICategory[], handleAddCat: (event, id: ICategory) => void, handleDeleteCat: (event, id: string) => void, handleModCat: (event, id: string, name: string) => void}) => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <span>
            <button type="button" className="btn category-button" onClick={() => noPropagation(setModal(1))}> Category </button>
            <Modal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={CategoryListModal} categories={categories} handleAddCat={handleAddCat} handleDeleteCat={handleDeleteCat} handleModCat={handleModCat}/>
        </span>
    )
}

export const CategoryHomeBar = ({dispatch} : {dispatch}) => {
    const icats = useSelector((state: RootState) => state.category);

    const handleAddCat = (event, id) => {
    }

    const handleDeleteCat = (event, id) => {
    }

    const handleModCat = (event, id, name) => {
    }

    return (
        <div className="category-navbar">
            <CategoryList categories={icats} handleAddCat={handleAddCat} handleDeleteCat={handleDeleteCat} handleModCat={handleModCat}/>
        </div>
    )
}
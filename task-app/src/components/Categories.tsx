import React, { useState } from 'react';
import { ICategory } from '../services/Category';
import { Modal, noPropagation } from './Modal';

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

export const CategoryList = ({categories, handleAddCat, handleDeleteCat, handleModCat} : {categories : ICategory[], handleAddCat: (id: ICategory) => void, handleDeleteCat: (id: string) => void, handleModCat: (id: string, name: string) => void}) => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <div>
            <button type="button" className="btn category-button" onClick={() => noPropagation(setModal(1))}></button>
            <Modal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={CategoryListModal} categories={categories} handleAddCat={handleAddCat} handleDeleteCat={handleDeleteCat} handleModCat={handleModCat}/>
        </div>
    )
}
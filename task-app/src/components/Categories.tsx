import React, { useState } from 'react';
import { ICategory } from '../services/Category';
import { Modal, noPropagation } from './Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../data/store';
import { sliceAddCategory, sliceDeleteCategory, sliceUpdateCategory } from '../data/categorySlice';
import { addCategory, deleteCategory, updateCategoryName } from '../services/Category';

export interface categoryHandlers {
    handleAddCat: (event) => void;
    handleDeleteCat: (id: string) => void;
    handleModCat: (id: string, name: string) => void;
    handleSelectCat: (id: string) => void;
}

export const CategoryListModal = ({categories, handlers} : {categories : ICategory[], handlers: categoryHandlers}) => {
    return (
        <div className="category-modal-scroller">
            <div className="category-modal-parent">
                <input className="category-create" placeholder={"+ Add a category"} onBlur={(event) => {
                    const inputValue = event.target.value;
                    event.stopPropagation();
                    if (inputValue.trim().length > 0) {
                        handlers.handleAddCat(inputValue)
                    }
                    event.target.value = ''; // Clear input value
                }}/>
                {categories.map((cat: ICategory, index: number) => (
                    <div className="category-modal-cat">
                        <input className="category-name" placeholder={cat.name} onBlur={(event) => {
                            const inputValue = event.target.value;
                            event.stopPropagation();
                            if (inputValue.trim().length > 0 && cat.name !== inputValue) {
                                handlers.handleModCat(cat._id, inputValue)
                            }
                            event.target.value = ''; // Clear input value
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            handlers.handleSelectCat(cat._id);
                        }}
                        />
                        <button className="category-close" onClick={(event) => {
                            event.stopPropagation();
                            handlers.handleDeleteCat(cat._id)
                        }}> X </button>
                    </div>
                    ))}
            </div>
        </div>
    )
}

export const CategoryList = ({categories, handlers, modalStyle} : {categories : ICategory[], handlers: categoryHandlers, modalStyle: string}) => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <span>
            <button type="button" className="category-button" onClick={() => noPropagation(setModal(1))}>Tag</button>
            <div className={modalStyle}>
                <Modal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={CategoryListModal} categories={categories} handlers={handlers}/>
            </div>
        </span>
    )
}

export const CategoryHomeBar = ({dispatch} : {dispatch}) => {
    const icats = useSelector((state: RootState) => state.category);

    const handleAddCat = (name) => {
        try {
                addCategory({
                    name: name
                }).then((newCategory) => {
                    dispatch(sliceAddCategory(newCategory))
                })
        } catch (error) {
            // popup
        }
    }

    const handleDeleteCat = (id) => {
        try {
            deleteCategory(id).then(() => {
                dispatch(sliceDeleteCategory(id))
            })
        } catch (error) {
            // popup
        }
    }

    const handleModCat = (id, name) => {
        try {
            updateCategoryName(id, name).then(() => {
                dispatch(sliceUpdateCategory({id: id, name: name}))
            })
        } catch (error) {
            // popup
        }
    }

    return (
        <div className="category-navbar">
            <CategoryList categories={icats} modalStyle="category-list"
            handlers={{
                handleAddCat: handleAddCat,
                handleDeleteCat: handleDeleteCat,
                handleModCat: handleModCat,
                handleSelectCat: () => {}
            }}/>
        </div>
    )
}

const SelectedCategoryListModal = ({selected, categories, handlers, modalStyle, handleDelete} : {selected : ICategory[], categories : ICategory[], handlers: categoryHandlers, modalStyle: string, handleDelete: (id: string) => void}) => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <div>
            <button type="button" className="category-button" onClick={() => noPropagation(setModal(1))}>+</button>
            <div className={modalStyle}>
                <Modal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={CategoryListModal} categories={categories} handlers={handlers} modalStyle=""/>
            </div>
            {selected.map((cat: ICategory, index: number) => (
                <div>
                    <h1>{cat.name}</h1>
                    <button className="category-close" onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(cat._id)
                    }}> X </button>
                </div>
            ))}
        </div>
    )
}

export const SelectedCategoryList = ({selected, categories, handlers, modalStyle, handleDelete} : {selected : ICategory[], categories : ICategory[], handlers: categoryHandlers, modalStyle: string, handleDelete: (id: string) => void}) => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <div className="task-categories">
            <button type="button" className="category-button" onClick={() => noPropagation(setModal(1))}>Tag</button>
            <Modal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={SelectedCategoryListModal} selected={selected} categories={categories} handlers={handlers} modalStyle={modalStyle} handleDelete={handleDelete}/>
        </div>
    )
}

export const getCategoriesFromIds = ({ids, categories} : {ids: string[], categories: ICategory[]}) => {
    const filteredCategories = categories.filter((category) => ids.includes(category._id));
    return filteredCategories;
}
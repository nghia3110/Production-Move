import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import Header from '../../../components/Layout/DefaultLayout/Header';
import { useEffect } from 'react';
import { useState } from 'react';
import productAPI from '../../../api/product';
import { useStateContext } from '../../../context/ContextProvider';

const Users = () => {
    const selectionsettings = { persistSelection: true };
    const toolbarOptions = ['Delete', 'Edit', 'Update', 'Cancel'];
    const editing = { allowDeleting: true, allowEditing: true };
    const [productsData, setProductsData] = useState([]);
    const { userProfileData, setUserProfileData } = useStateContext();

    const productsGrid = [
        { type: 'checkbox', width: '50' },
        {
            field: 'imei',
            headerText: 'IMEI',
            width: '150',
            textAlign: 'Center'
        },
        {
            field: 'productCode',
            headerText: 'Product Code',
            width: '150',
            textAlign: 'Center'
        },
        {
            field: 'warehouseCode',
            headerText: 'Warehouse Code',
            width: '130',
            textAlign: 'Center'
        },
        {
            field: 'status',
            headerText: 'Status',
            width: '150',
            textAlign: 'Center'
        }
    ];

    useEffect(() => {
        const getData = async () => {
            const products = await productAPI.getProduct(userProfileData.id);
            setProductsData(products);
        }

        getData();
    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
            <Header category="Page" title="Products" />
            <GridComponent
                dataSource={productsData}
                enableHover={true}
                allowPaging
                pageSettings={{ pageCount: 5 }}
                selectionSettings={selectionsettings}
                toolbar={toolbarOptions}
                editSettings={editing}
                allowSorting
            >
                <ColumnsDirective>
                    {productsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
            </GridComponent>
        </div>
    );
};

export default Users;

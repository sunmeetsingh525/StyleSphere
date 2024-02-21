/* eslint-disable react/self-closing-comp */
import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Upload, message } from 'antd';
import { connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';

import styles from './index.less';

import { useState } from 'react';
// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
const AddProduct = ({
  visible,
  setVisible,
  form,
  dispatch,
  // id,
  productDetails,

  editId,
  categoryList,
  subCategoryList,
  productVariantList,
  getAllProducts,
  subProductVariantList,
  StatsChange,
  setEditId,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [image, setImage] = useState([]);
  const [previewTitle, setPreviewTitle] = useState('');
  const [id, setId] = useState('');
  const [productVariantId, setProductVariantId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch({
      type: 'category/getAllCategory',
      payload: { query: { startIndex: 0, viewSize: 10000 } },
    });
  }, []);

  useEffect(() => {
    if (productDetails?.product) {
      setImage(productDetails?.product?.media);
      form.setFieldsValue({
        description: productDetails?.product?.description,
        inventory: productDetails?.product?.inventory,
        price: productDetails?.product?.price,
        categoryId: productDetails?.product?.category?._id,
        inventory: productDetails?.product?.inventory,
        name: productDetails?.product?.name,
      });
    }
  }, [productDetails?.product]);

  const onFinish = (values) => {
    if (image.length > 0) {
      setLoading(true);

      if (visible.type === 'add') {
        const formData = new FormData();
        formData.append('description', values?.description);
        formData.append('inventory', values?.inventory);
        formData.append('price', values?.price);
        formData.append('categoryId', id);
        formData.append('name', values.name);
        image?.map((i) => {
          formData.append('image', i);
        });
        dispatch({
          type: 'product/addProduct',
          payload: {
            body: formData,
          },
        })
          .then((res) => {
            form.resetFields();
            setImage([]);
            setEditId('');
            setVisible({});
            getAllProducts();
            setLoading(false);
            message.success('Product Added Sucessfully!');
          })
          .catch((err) => {
            message.error(err?.data?.error?.message);
          });
      } else if (visible.type === 'edit') {
        const formData = new FormData();
        formData.append('description', values?.description);
        formData.append('price', values?.price);
        formData.append('name', values.name);
        formData.append('inventory', values?.inventory);
        formData.append('categoryId', values?.categoryId);
        image?.map((i) => {
          if (!!i?._id === false) formData.append('image', i);
        });

        dispatch({
          type: 'product/updateProduct',

          payload: {
            body: formData,
            pathParams: { id: editId },
          },
        })
          .then((res) => {
            form.resetFields();
            setImage([]);
            setLoading(false);
            setVisible({ visible: false, type: 'edit' });
            getAllProducts();
            message.success('Product Updated Sucessfully!');
          })
          .catch((err) => {
            message.error(err?.data?.error?.message);
          });
      }
    } else {
      message.error('image is required');
    }
  };

  const handleCancelModal = () => {
    form.resetFields();
    setVisible(false);
    setImage([]);
    setEditId('');
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      console.log('URL.createObjectURL(file);', URL.createObjectURL(file));
    }
    console.log(file.url, 'preview');
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Modal
      title={
        <span style={{ color: '#10181E' }} className="font-medium">
          {visible.type === 'add' ? (
            <div className="-ml-4">Add Product</div>
          ) : (
            <div className="-ml-4">Edit Product</div>
          )}
        </span>
      }
      closable={true}
      footer={null}
      open={visible?.visible}
      onCancel={handleCancelModal}
      okText="Submit"
      okButtonProps={{ type: 'primary', size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      okType=""
    >
      <Form layout="vertical" form={form} onFinish={onFinish} name="Add Category">
        <Row gutter={16}>
          <Col xs={18} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              name="name"
              label={<span className="formLabel p-0 mb-0">Product Name</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter product name!',
                },
              ]}
            >
              <Input size="large" placeholder="Enter product name" />
            </Form.Item>
          </Col>
          <Col xs={18} sm={18} md={12} lg={12} xl={12} className="">
            <Form.Item
              name="categoryId"
              label={<span className="formLabel p-0 mb-0"> Category</span>}
              rules={[
                {
                  required: true,
                  message: 'Please select category',
                },
              ]}
            >
              <Select
                placeholder="Please Select Category"
                size="large"
                getPopupContainer={(node) => node.parentNode}
                onChange={(e) => {
                  setId(e);
                }}
                options={categoryList?.data?.map((item) => ({
                  value: item?._id,
                  label: item?.name,
                  key: item?._id,
                }))}
              ></Select>
            </Form.Item>
          </Col>

          <Col xs={18} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              name="description"
              label={<span className="formLabel p-0 mb-0">Description</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter Product Description!',
                },
              ]}
            >
              <Input size="large" placeholder="Enter Product Description" />
            </Form.Item>
          </Col>
          <Col xs={18} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              name="price"
              label={<span className="formLabel p-0 mb-0">Price</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter Product Price!',
                },

                {
                  pattern: /^[0-9]+$/,
                  message: 'Please enter a number!',
                },
              ]}
            >
              <Input
                type="text"
                size="large"
                placeholder="Enter Product Price"
                inputNumberStyle={{ appearance: 'textfield' }}
              />
            </Form.Item>
          </Col>

          <Col xs={18} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              name="inventory"
              label={<span className="formLabel p-0 mb-0">Inventory</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter inventory!',
                },
              ]}
            >
              <Input type="text" size="large" placeholder="Enter enter inventory" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name="image" label={<span className="formLabel p-0 mb-0">Images</span>}>
              <Upload
                listType="picture-card"
                multiple
                fileList={
                  !loading
                    ? image?.map((img, idx) => ({ ...img, status: 'done', uid: img?.uid }))
                    : [...image?.map((img, idx) => ({ ...img, status: 'done', uid: img?.uid }))]
                }
                onPreview={handlePreview}
                onRemove={(file) => {
                  const { confirm } = Modal;
                  return new Promise((resolve) => {
                    confirm({
                      title: 'Are you sure you want to Delete  Image?',
                      width: 300,
                      className: `${styles.customModalStyle}`,
                      onOk: () => {
                        resolve(true);
                        if (editId) {
                          setImage((prev) => prev.filter((item) => item._id !== file._id));
                          dispatch({
                            type: 'product/deleteProductImage',
                            payload: {
                              pathParams: {
                                imageId: file._id,
                                productId: editId,
                              },
                            },
                          });
                        } else {
                          setImage((prev) => prev.filter((item) => item.uid !== file.uid));
                        }
                      },
                    });
                  });
                }}
                beforeUpload={(file) => {
                  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Add more file types if needed
                  const isFileTypeAllowed = allowedFileTypes.includes(file.type);
                  if (!isFileTypeAllowed) {
                    message.error('Only JPEG/PNG images are allowed');
                  } else {
                    file.url = URL.createObjectURL(file);
                    setImage((prev) => [...prev, file]);
                  }
                  return false;
                }}
              >
                {image.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            size="large"
            onClick={() => {
              form.resetFields();
              setVisible({ visible: false, type: 'add' });
            }}
          >
            Back
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={() => {}}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
export default connect(({ loading, category, product, productVariant }) => ({
  productVariantList: productVariant?.productVariantList,
  subProductVariantList: productVariant?.subProductVariantList,
  subCategoryList: category?.subCategoryList,
  categoryList: category?.categoryList,
  productDetails: product?.productDetails,
  loadingForSubCategory: loading.effects['category/getAllSubCategory'],
  loadingForCategory: loading.effects['category/getAllCategory'],
  loading: loading.effects['product/addProduct'],
}))(AddProduct);

// <Col xs={18} sm={18} md={12} lg={12} xl={12}>
//   <Form.Item
//     name="inventory"
//     label={<span className="formLabel p-0 mb-0">Inventory</span>}
//     rules={[
//       {
//         required: true,
//         message: 'Please enter Product inventory!',
//       },
//     ]}
//   >
//     <Input type="number" size="large" placeholder="Enter Product inventory" />
//   </Form.Item>
// </Col>

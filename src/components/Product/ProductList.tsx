import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/interface/Product";
import { Button, Image, message, Popconfirm, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";

const ProductList = () => {
  const queryClient = useQueryClient()
  const [messageAPI, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products`);
      return data.map((product: Product) => ({
        key: product.id,
        ...product,
      }));
    },
  });
  const {mutate} = useMutation({
    mutationFn: async(id: number) =>{
      await axios.delete(`http://localhost:3000/products/${id}`)
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({
        queryKey: ['products']
      })
      messageAPI.success("Deleted Product")
    }
  })
  const handleEdit = (id: number) => {
    navigate(`/Edit/${id}`)
  }
  const columns = [
    {
      key: "name",
      title: "Product Name",
      dataIndex: "name",
    },
    {
      key: "price",
      title: "Product price",
      dataIndex: "price",
    },
    {
      key: "description",
      title: "Product description",
      dataIndex: "description",
    },
    {
      key: "image",
      title: "Product image",
      dataIndex: "image",
      render: (_: any, product: Product) => (
        <div>
          <Image src={product.image}></Image>
        </div>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_: any, product: Product) => (
        <div>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => mutate(product.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Popconfirm
            title="Edit the task"
            description="Are you sure to Edit this task?"
            onConfirm={() => handleEdit(product.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Edit</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {contextHolder}
      <div>
        <Link to={`/Add`}>
        <Button>
          <PlusCircleFilled/>Add
        </Button>
        </Link>
      </div>
      <Table dataSource={data} columns={columns}></Table>
    </div>
  );
};

export default ProductList;

import { Product } from "@/interface/Product";
import { BackwardFilled } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, InputNumber, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  image?: string
};


const ProductAdd = () => {
  const [messageAPI, contextHolder] = message.useMessage()
  const {mutate} = useMutation({
    mutationFn: async (product: FieldType) =>{
      await axios.post(`http://localhost:3000/products`, product)
    },
    onSuccess: () =>{
      messageAPI.success("Added Product")
    }
  })
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values)
  };
  return (
    <div>
      {contextHolder}
      <div>
        <Link to={`/`}>
        <Button>
          <BackwardFilled/>Back
        </Button>
        </Link>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input Product name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="price"
          name="price"
          rules={[{ required: true, message: "Please input Product price!" },
            {type: 'number', min: 0, message: "Must be a number greater or equal 0"}
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<FieldType>
          label="description"
          name="description"
          rules={[{ required: true, message: "Please input Product description!" }]}
        >
          <Input.TextArea rows={5}/>
        </Form.Item>
        <Form.Item<FieldType>
          label="image"
          name="image"
          rules={[{ required: true, message: "Please input Product image link!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;

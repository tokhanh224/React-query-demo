import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import type { FormProps } from "antd";
import axios from "axios";
type FieldType = {
  email?: string;
  password?: string;
};
const SignIn = () => {
  const [messageAPI, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: async (users: FieldType) => {
      try {
        await axios.post(`http://localhost:3000/signin`, users);
        messageAPI.success("signin success");
      } catch (error) {
        messageAPI.error((error as any).response.data)
      }
    },
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutate(values);
  };
  return (
    <div>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[
            { required: true, type: "email", message: "Please input email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="password"
          name="password"
          rules={[{ required: true, message: "Please input password !" }]}
        >
          <Input.Password />
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

export default SignIn;

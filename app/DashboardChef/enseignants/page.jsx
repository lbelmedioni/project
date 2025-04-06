'use client';

import { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Modal, Form, Input, Select, Statistic, Tag, Space } from 'antd';
import { UserOutlined, TeamOutlined, PieChartOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Enseignant() {
    const router = useRouter();
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [dateRange, setDateRange] = useState([]);
    const [facultyLogo, setFacultyLogo] = useState(null);

    useEffect(() => {
        const faculty = localStorage.getItem('faculty');
        if (faculty) {
            setFacultyLogo(`/logos/${faculty.toLowerCase()}.png`);
        }
        fetchTeachers();
    }, []);

    const getFacultyLogo = (faculty) => {
        return `/logos/${faculty.toLowerCase()}.png`;
    };

    const fetchTeachers = async () => {
        try {
            const response = await fetch('/api/teachers');
            const data = await response.json();
            setTeachers(data);
            setFilteredTeachers(data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (value) => {
        try {
            const response = await fetch(`/api/teachers/search?query=${value}`);
            const data = await response.json();
            setFilteredTeachers(data);
        } catch (error) {
            console.error('Error searching teachers:', error);
        }
    };

    const handleFilter = () => {
        let filtered = teachers;
        
        if (selectedDepartment) {
            filtered = filtered.filter(t => t.department === selectedDepartment);
        }

        if (dateRange.length === 2) {
            const [start, end] = dateRange;
            filtered = filtered.filter(t => {
                const teacherDate = new Date(t.date);
                return teacherDate >= start && teacherDate <= end;
            });
        }

        setFilteredTeachers(filtered);
    };

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Département',
            dataIndex: 'department',
            key: 'department',
            filters: [
                { text: 'Informatique', value: 'informatique' },
                { text: 'Mathématiques', value: 'mathematiques' },
                { text: 'Physique', value: 'physique' },
                { text: 'Chimie', value: 'chimie' }
            ],
            onFilter: (value, record) => record.department === value,
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'Date d\'ajout',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Modifier
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Supprimer
                    </Button>
                </Space>
            ),
        },
    ];

    const handleAddTeacher = () => {
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/teachers?id=${id}`, {
                method: 'DELETE',
            });
            fetchTeachers();
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (values.id) {
                await fetch(`/api/teachers/${values.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });
            } else {
                await fetch('/api/teachers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });
            }
            fetchTeachers();
            setModalVisible(false);
        } catch (error) {
            console.error('Error saving teacher:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {facultyLogo && (
                <div className="flex justify-center mb-6">
                    <Image
                        src={facultyLogo}
                        alt="Faculté Logo"
                        width={200}
                        height={100}
                        className="rounded-lg"
                    />
                </div>
            )}

            <Card className="bg-white rounded-lg shadow-md">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Statistic
                            title="Nombre d'enseignants"
                            value={teachers.length}
                            prefix={<UserOutlined />}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Heures de vacation"
                            value={1000}
                            prefix={<TeamOutlined />}
                        />
                    </Col>
                </Row>

                <div className="mt-4 flex justify-between items-center">
                    <Space>
                        <Button
                            icon={<SearchOutlined />}
                            onClick={() => setModalVisible(true)}
                        >
                            Ajouter un enseignant
                        </Button>
                        <Input.Search
                            placeholder="Rechercher un enseignant..."
                            allowClear
                            onSearch={handleSearch}
                        />
                    </Space>
                    <Select
                        placeholder="Filtrer par département"
                        value={selectedDepartment}
                        onChange={setSelectedDepartment}
                        style={{ width: 200 }}
                    >
                        <Option value="">Tous les départements</Option>
                        <Option value="informatique">Informatique</Option>
                        <Option value="mathematiques">Mathématiques</Option>
                        <Option value="physique">Physique</Option>
                    </Select>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredTeachers}
                    loading={loading}
                    rowKey="id"
                    className="mt-4"
                />

                <div style={{ marginBottom: '24px' }}>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Input.Search
                                placeholder="Rechercher par nom..."
                                onSearch={handleSearch}
                                enterButton
                                prefix={<SearchOutlined />}
                            />
                        </Col>
                        <Col span={8}>
                            <Select
                                placeholder="Filtrer par département"
                                onChange={setSelectedDepartment}
                                style={{ width: '100%' }}
                            >
                                <Option value="informatique">Informatique</Option>
                                <Option value="mathematiques">Mathématiques</Option>
                                <Option value="physique">Physique</Option>
                                <Option value="chimie">Chimie</Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            <RangePicker
                                onChange={(dates) => setDateRange(dates)}
                                style={{ width: '100%' }}
                            />
                        </Col>
                    </Row>
                </div>
            </Card>

            <Modal
                title={form.getFieldValue('id') ? 'Modifier enseignant' : 'Ajouter enseignant'}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={() => setModalVisible(false)}
                okText="Enregistrer"
                cancelText="Annuler"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="id"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Nom Complet"
                        rules={[{ required: true, message: 'Veuillez entrer le nom complet' }]}
                    >
                        <Input placeholder="Ex: Jean Dupont" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Veuillez entrer l\'email' }]}
                    >
                        <Input type="email" placeholder="Ex: jean.dupont@example.com" />
                    </Form.Item>
                    <Form.Item
                        name="department"
                        label="Département"
                        rules={[{ required: true, message: 'Veuillez sélectionner un département' }]}
                    >
                        <Select placeholder="Sélectionnez un département">
                            <Option value="informatique">Informatique</Option>
                            <Option value="mathematiques">Mathématiques</Option>
                            <Option value="physique">Physique</Option>
                            <Option value="chimie">Chimie</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
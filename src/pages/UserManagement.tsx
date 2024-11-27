import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import UserTable from './UserTable';
import { User } from '@/components/types/User';

enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Moderator = 'Moderator',
    Viewer = 'Viewer',
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: UserRole.Admin, status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: UserRole.User, status: 'Inactive' },
        { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: UserRole.Moderator, status: 'Active' },
        { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', role: UserRole.Viewer, status: 'Inactive' },
        { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', role: UserRole.Admin, status: 'Active' },
        { id: 6, name: 'Diana Evans', email: 'diana.evans@example.com', role: UserRole.User, status: 'Inactive' },
        { id: 7, name: 'Ethan Foster', email: 'ethan.foster@example.com', role: UserRole.Moderator, status: 'Active' },
        { id: 8, name: 'Fiona Green', email: 'fiona.green@example.com', role: UserRole.Viewer, status: 'Inactive' },
        { id: 9, name: 'George Hill', email: 'george.hill@example.com', role: UserRole.Admin, status: 'Active' },
        { id: 10, name: 'Hannah Ivers', email: 'hannah.ivers@example.com', role: UserRole.User, status: 'Inactive' },
        { id: 11, name: 'Ian James', email: 'ian.james@example.com', role: UserRole.Moderator, status: 'Active' },
        { id: 12, name: 'Julia King', email: 'julia.king@example.com', role: UserRole.Viewer, status: 'Inactive' },
        { id: 13, name: 'Kevin Lee', email: 'kevin.lee@example.com', role: UserRole.Admin, status: 'Active' },
        { id: 14, name: 'Laura Moore', email: 'laura.moore@example.com', role: UserRole.User, status: 'Inactive' },
        { id: 15, name: 'Michael Neal', email: 'michael.neal@example.com', role: UserRole.Moderator, status: 'Active' },
        { id: 16, name: 'Nancy Oliver', email: 'nancy.oliver@example.com', role: UserRole.Viewer, status: 'Inactive' },
        { id: 17, name: 'Oliver Peters', email: 'oliver.peters@example.com', role: UserRole.Admin, status: 'Active' },
        { id: 18, name: 'Patricia Quinn', email: 'patricia.quinn@example.com', role: UserRole.User, status: 'Inactive' },
        { id: 19, name: 'Quincy Roberts', email: 'quincy.roberts@example.com', role: UserRole.Moderator, status: 'Active' },
        { id: 20, name: 'Rachel Scott', email: 'rachel.scott@example.com', role: UserRole.Viewer, status: 'Inactive' },
        { id: 21, name: 'Samuel Taylor', email: 'samuel.taylor@example.com', role: UserRole.Admin, status: 'Active' },
        { id: 22, name: 'Tina Underwood', email: 'tina.underwood@example.com', role: UserRole.User, status: 'Inactive' },
    ]);


    const [newUser, setNewUser] = useState<User>({
        id: 0,
        name: '',
        email: '',
        role: UserRole.User,
        status: 'Active',
    });

    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleAddUser = () => {
        if (!newUser.name || !newUser.email || !newUser.role) return;
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ id: 0, name: '', email: '', role: UserRole.User, status: 'Active' });
    };

    const handleEditUser = () => {
        if (!editingUser) return;
        setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
        setEditingUser(null);
    };

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const toggleStatus = (id: number) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
        ));
    };

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">User Management</h1>

            {/* Add/Edit User Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{editingUser ? 'Edit User' : 'Add User'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter user name"
                                value={editingUser ? editingUser.name : newUser.name}
                                onChange={e =>
                                    editingUser
                                        ? setEditingUser({ ...editingUser, name: e.target.value })
                                        : setNewUser({ ...newUser, name: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={editingUser ? editingUser.email : newUser.email}
                                onChange={e =>
                                    editingUser
                                        ? setEditingUser({ ...editingUser, email: e.target.value })
                                        : setNewUser({ ...newUser, email: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={editingUser ? editingUser.role : newUser.role}
                                onValueChange={value =>
                                    editingUser
                                        ? setEditingUser({ ...editingUser, role: value })
                                        : setNewUser({ ...newUser, role: value })
                                }
                            >
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(UserRole).map(role => (
                                        <SelectItem key={role} value={role}>
                                            {role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Button onClick={editingUser ? handleEditUser : handleAddUser} variant="default">
                            {editingUser ? 'Update User' : 'Add User'}
                        </Button>
                        {editingUser && (
                            <Button onClick={() => setEditingUser(null)} variant="secondary">
                                Cancel
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* User List */}
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <UserTable
                        users={users}
                        onEdit={setEditingUser}
                        onDelete={handleDeleteUser}
                        onToggleStatus={toggleStatus}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default UserManagement;

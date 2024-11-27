import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { User } from '@/components/types/User';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
    onToggleStatus: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onToggleStatus }) => {
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);

    const toggleSelection = (id: number) => {
        setSelectedUserIds(prev =>
            prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedUserIds.length === users.length) {
            setSelectedUserIds([]); // Unselect all
        } else {
            setSelectedUserIds(users.map(user => user.id)); // Select all
        }
    };

    const isSelected = (id: number) => selectedUserIds.includes(id);

    const handleConfirmDelete = () => {
        if (userToDelete !== null) {
            onDelete(userToDelete);
            setUserToDelete(null);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <p>Selected Users: {selectedUserIds.length}</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                checked={selectedUserIds.length === users.length && users.length > 0}
                                onCheckedChange={toggleSelectAll}
                            />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Checkbox
                                    checked={isSelected(user.id)}
                                    onCheckedChange={() => toggleSelection(user.id)}
                                />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                                    {user.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="space-x-2">
                                <Button variant="link" onClick={() => onEdit(user)}>
                                    Edit
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="link" onClick={() => setUserToDelete(user.id)}>
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                                            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleConfirmDelete}>Confirm</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <Button variant="link" onClick={() => onToggleStatus(user.id)}>
                                    Toggle Status
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserTable;

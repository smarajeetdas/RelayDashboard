import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  getUsers(): Observable<User[]> {
    // This is mock data. In a real application, this would come from an API
    const users: User[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        geography: 'USA',
        status: 'Active',
        lastLogin: '2025-04-22 14:30:00',
        createdDate: '2024-10-15',
        accessibleServices: 'All Services'
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'Developer',
        geography: 'UK',
        status: 'Active',
        lastLogin: '2025-04-23 09:15:00',
        createdDate: '2024-11-10'
      },
      {
        id: '3',
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.johnson@example.com',
        role: 'Tester',
        geography: 'India',
        status: 'Active',
        lastLogin: '2025-04-21 16:45:00',
        createdDate: '2025-01-05'
      },
      {
        id: '4',
        firstName: 'Emily',
        lastName: 'Wilson',
        email: 'emily.wilson@example.com',
        role: 'Developer',
        geography: 'Canada',
        status: 'Inactive',
        lastLogin: '2025-03-10 11:20:00',
        createdDate: '2024-09-20'
      },
      {
        id: '5',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@example.com',
        role: 'Viewer',
        geography: 'Europe',
        status: 'Active',
        lastLogin: '2025-04-22 13:10:00',
        createdDate: '2025-02-15'
      }
    ];
    
    // Simulate API delay
    return of(users).pipe(delay(800));
  }
  
  getUserById(userId: string): Observable<User | null> {
    // Find user by ID from mock data
    return of(this.getMockUserById(userId)).pipe(delay(800));
  }
  
  private getMockUserById(userId: string): User | null {
    // This is mock data. In a real application, this would be fetched from an API
    const users: Record<string, User> = {
      '1': {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        geography: 'USA',
        status: 'Active',
        lastLogin: '2025-04-22 14:30:00',
        createdDate: '2024-10-15',
        accessibleServices: 'All Services',
        projects: [
          { id: 'p1', name: 'Customer Portal', role: 'Administrator' },
          { id: 'p2', name: 'Payment Gateway', role: 'Contributor' },
          { id: 'p3', name: 'Inventory System', role: 'Viewer' }
        ],
        associatedUsers: [
          { id: '2', name: 'Jane Smith', role: 'Developer' },
          { id: '3', name: 'Robert Johnson', role: 'Tester' }
        ]
      },
      '2': {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'Developer',
        geography: 'UK',
        status: 'Active',
        lastLogin: '2025-04-23 09:15:00',
        createdDate: '2024-11-10',
        accessibleServices: 'Development, Testing',
        projects: [
          { id: 'p1', name: 'Customer Portal', role: 'Developer' },
          { id: 'p4', name: 'Mobile App', role: 'Lead Developer' }
        ],
        associatedUsers: [
          { id: '1', name: 'John Doe', role: 'Admin' },
          { id: '5', name: 'Michael Brown', role: 'Viewer' }
        ]
      },
      '3': {
        id: '3',
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.johnson@example.com',
        role: 'Tester',
        geography: 'India',
        status: 'Active',
        lastLogin: '2025-04-21 16:45:00',
        createdDate: '2025-01-05',
        accessibleServices: 'Testing, Reporting',
        projects: [
          { id: 'p1', name: 'Customer Portal', role: 'QA Lead' },
          { id: 'p2', name: 'Payment Gateway', role: 'Tester' }
        ],
        associatedUsers: [
          { id: '1', name: 'John Doe', role: 'Admin' },
          { id: '4', name: 'Emily Wilson', role: 'Developer' }
        ]
      },
      '4': {
        id: '4',
        firstName: 'Emily',
        lastName: 'Wilson',
        email: 'emily.wilson@example.com',
        role: 'Developer',
        geography: 'Canada',
        status: 'Inactive',
        lastLogin: '2025-03-10 11:20:00',
        createdDate: '2024-09-20',
        accessibleServices: 'Development',
        projects: [
          { id: 'p4', name: 'Mobile App', role: 'Developer' }
        ],
        associatedUsers: [
          { id: '3', name: 'Robert Johnson', role: 'Tester' }
        ]
      },
      '5': {
        id: '5',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@example.com',
        role: 'Viewer',
        geography: 'Europe',
        status: 'Active',
        lastLogin: '2025-04-22 13:10:00',
        createdDate: '2025-02-15',
        accessibleServices: 'Reporting, Viewing',
        projects: [
          { id: 'p1', name: 'Customer Portal', role: 'Stakeholder' },
          { id: 'p3', name: 'Inventory System', role: 'Reviewer' }
        ],
        associatedUsers: [
          { id: '2', name: 'Jane Smith', role: 'Developer' }
        ]
      }
    };
    
    return users[userId] || null;
  }
}
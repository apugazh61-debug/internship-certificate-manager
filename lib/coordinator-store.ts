/**
 * Server-side in-memory store for coordinator accounts.
 * This persists for the lifetime of the Next.js server process.
 * In production, replace with a DB table.
 */

interface CoordinatorAccount {
    email: string;
    password: string;
    name: string;
    role: string;
}

// Module-level variable — survives across API requests within the same server process
const coordinatorStore: Map<string, CoordinatorAccount> = new Map([
    ['suresh@college.edu',  { email: 'suresh@college.edu',  password: 'Suresh@2024',  name: 'Suresh Kumar', role: 'coordinator' }],
    ['priya@college.edu',   { email: 'priya@college.edu',   password: 'Priya@2024',   name: 'Priya Rajan',  role: 'coordinator' }],
    ['karthik@college.edu', { email: 'karthik@college.edu', password: 'Karthik@2024', name: 'Karthik Vel',  role: 'coordinator' }],
    ['anitha@college.edu',  { email: 'anitha@college.edu',  password: 'Anitha@2024',  name: 'Anitha S',     role: 'coordinator' }],
    ['ramesh@gmail.com',    { email: 'ramesh@gmail.com',    password: 'Approved123',  name: 'Ramesh',       role: 'coordinator' }],
]);

export function addCoordinator(account: CoordinatorAccount) {
    coordinatorStore.set(account.email, account);
}

export function removeCoordinator(email: string) {
    coordinatorStore.delete(email);
}

export function validateCoordinator(email: string, password: string): CoordinatorAccount | null {
    const account = coordinatorStore.get(email);
    if (account && account.password === password) return account;
    return null;
}

export function getAllCoordinators(): CoordinatorAccount[] {
    return Array.from(coordinatorStore.values());
}

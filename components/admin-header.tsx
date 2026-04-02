export function AdminHeader() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6  ">
            <div className="flex items-center">
                {/* Breadcrumbs or Title could go here */}
                <h1 className="text-lg font-medium text-gray-900 ">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 "></div>
                    <span className="text-sm font-medium text-gray-700 ">Admin</span>
                </div>
            </div>
        </header>
    );
}

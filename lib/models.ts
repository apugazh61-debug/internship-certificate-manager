import sequelize from './db';
import User from '@/models/User';
import Intern from '@/models/Intern';
import Module from '@/models/Module';
import InternModule from '@/models/InternModule';
import Attendance from '@/models/Attendance';
import Certificate from '@/models/Certificate';
import Stipend from '@/models/Stipend';

// Define Associations

// Intern <-> Module (Many-to-Many through InternModule)
Intern.belongsToMany(Module, { through: InternModule, foreignKey: 'intern_id' });
Module.belongsToMany(Intern, { through: InternModule, foreignKey: 'module_id' });

// Intern <-> Attendance (One-to-Many)
Intern.hasMany(Attendance, { foreignKey: 'intern_id' });
Attendance.belongsTo(Intern, { foreignKey: 'intern_id' });

// Intern <-> Certificate (One-to-Many, usually one but allow re-issue)
Intern.hasMany(Certificate, { foreignKey: 'intern_id' });
Certificate.belongsTo(Intern, { foreignKey: 'intern_id' });

// Intern <-> Stipend (One-to-Many)
Intern.hasMany(Stipend, { foreignKey: 'intern_id' });
Stipend.belongsTo(Intern, { foreignKey: 'intern_id' });

export {
    sequelize,
    User,
    Intern,
    Module,
    InternModule,
    Attendance,
    Certificate,
    Stipend,
};

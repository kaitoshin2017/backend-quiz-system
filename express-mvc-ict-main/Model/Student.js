const studentSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    LastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    Grade: {
        type: String,
        required: [true, 'Grade is required'],
    },
    Username: {
        type: String,
        required: [true, 'Username is required'],
    },
    Password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

// Create models for User and Student
const User = mongoose.model('User', usersSchema);
const Student = mongoose.model('Student', studentSchema);

// Export both models
module.exports = { User, Student };
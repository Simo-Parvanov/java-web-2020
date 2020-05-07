const coursesName = {
    fundamentals: 'Java Fundamentals',
    advanced: 'Java Advanced',
    db: 'Java DB',
    web: 'Java Web',
    htmlAndCss: 'HTML and CSS'
};

const educationName = {
    onSite: 'On Site',
    onLine: 'Online'
};

const availableCourses = [
    {name: coursesName.fundamentals, price: 170},
    {name: coursesName.advanced, price: 180},
    {name: coursesName.db, price: 190},
    {name: coursesName.web, price: 490}
];

const educationType = [
    {name: educationName.onSite, discount: 0},
    {name: educationName.onLine, discount: 0.06}
];

const getCoursesItem = (course) => {
    return $('<label/>')
        .append($('<input/>')
            .attr('type', 'checkbox')
            .val(course.name))
        .append(course.name)
};

const getEducationFormItem = (educationForm) => {
    return $('<label/>')
        .append(educationForm.name)
        .append($('<input/>')
            .attr('type', 'radio')
            .attr('name', 'drone')
            .val(educationForm.name))
};

const generateList = (item, generateItemFunk) =>
    item.map(course => generateItemFunk(course))
        .map(courseItem => {
            return $('<li/>')
                .append(courseItem)
        });

const getMyCourseItem = (course) => course.name;

const generationAvailableCoursesList = () => {
    generateList(availableCourses, getCoursesItem)
        .forEach(item => item.appendTo('#list-courses'))
};

const generationFormTypeList = () => {
    generateList(educationType, getEducationFormItem)
        .forEach(item => item.appendTo('#list-education-form'));
    $('#list-education-form li:first-of-type input')
        .attr('checked', 'checked')
};

const generationMyCoursesList = (courses) => {
    $('#my-courses-list').html('');
    generateList(courses, getMyCourseItem)
        .forEach(item => item.appendTo('#my-courses-list'))
};

const getSelectedCourses = () => {
    const coursesName = [...$('#list-courses input:checked')].map(input => input.value);
    return coursesName.map(coursesName => 
	({...availableCourses.find(course => course.name === coursesName)}))
};

const getSelectedEducationForm = () => {
    const educationTypeName = $('#list-education-form input:checked').val();
    return educationType.find(education => education.name === educationTypeName)
};
const getCourse = (course, coursesName) =>
    course.find(course => course.name === coursesName);


const decorateCourses = (courses) => {
    const fundamentalsCourse = getCourse(courses, coursesName.fundamentals);
    const advancedCourse = getCourse(courses, coursesName.advanced);
    const dbCourse = getCourse(courses, coursesName.db);
    const webCourse = getCourse(courses, coursesName.web);
    if (fundamentalsCourse && advancedCourse) {
        //discount 10%
        advancedCourse.price *= 0.9;
        if (dbCourse) {
            //discount 6%
            fundamentalsCourse.price *= 0.94;
            advancedCourse.price *= 0.94;
            dbCourse.price *= 0.94;
            if (webCourse) {
                courses.push({
                    name: coursesName.htmlAndCss,
                    price: 0
                });
            }
        }
    }
};

const submitCourses = () => {
    const courses = getSelectedCourses();
    const educationForm = getSelectedEducationForm();
    decorateCourses(courses);
    let totalPrice = courses.reduce((sum, course) =>
    sum + course.price, 0);
    if (educationForm.name === educationName.onLine)
        //discount for Online form 6%
        totalPrice *= 0.94;
    $('#total-price').html(totalPrice.toFixed(2));
    generationMyCoursesList(courses);
};


$(function () {
    generationAvailableCoursesList();
    generationFormTypeList();
    $('#btn-submit').on('click', submitCourses);
});

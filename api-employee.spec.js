const { test, expect } = require('@playwright/test');
const { request } = require('node:http');
const BASE_URL = 'http://localhost:8887/api/v1/employees';

test.describe('Scenario_01 : Create Employee API Testing', () => {

    test('TC_POST_01 : Create employee success -> Status 201', async ({ request }) => {    
        const response = await request.post(BASE_URL , {
            data : {
                dob : "2000-08-01",
                email : "test@gmail.com",
                firstName : "Meeka",
                id : 0,
                lastName : "Miolui"
                }
            });            
    expect(response.status()) .toBe(201);
    });


    test('TC_POST_02 : Create employee failed with invalid DOB format -> Status 400' , async ({ request }) => {
        const response = await request.post(BASE_URL , {
            data : {
                dob : "20000801",
                email : "test02@gmail.com",
                firstName : "Luna",
                id : 0,
                lastName : "Ceacharer"
            }
        });
    expect(response.status()) .toBe(400);
    });


    test('TC_POST_03 : Create employee failed with invalid email format and validate default Message -> Status 400' , async ({ request }) => {
        const response = await request.post(BASE_URL , {
            data : {
                dob : "2001-01-01",
                email : "invalidemailgmail.com",
                firstName : "Teena",
                id : 0,
                lastName : "Barber"
            }
        });
    expect(response.status()) .toBe(400);
        const responseBody = await response.json();
        // console.log('--- Response ตัวจริงจากหลังบ้าน ---');
        // console.log(JSON.stringify(responseBody, null, 2));
    expect(responseBody.errors[0].defaultMessage).toBe('must be a well-formed email address');
    });


    test('TC_POST_04 : Create employee failed with invalid firstname format and validate default Message -> Status 400' , async ({ request }) => {
        const response = await request.post(BASE_URL , {
            data : {
                dob : "2001-01-01",
                email : "test04@gmail.com",
                firstName : "",
                id : 0,
                lastName : "Wenuscho"
            }
        });
    expect(response.status()) .toBe(400);
        const responseBody = await response.json();
        // console.log('--- Response ตัวจริงจากหลังบ้าน ---');
        // console.log(JSON.stringify(responseBody, null, 2));
    expect(responseBody.errors[0].defaultMessage).toMatch(/mandatory|size/);
    });


    test('TC_POST_05 : Create employee failed with invalid id and validate default Message -> Status 400' , async ({ request }) => {
        const response = await request.post(BASE_URL , {
            data : {
                dob : "2001-01-01",
                email : "test05@gmail.com",
                firstName : "Anya",
                id : "abc",
                lastName : "Chakkapong"
            }
        });
    expect(response.status()) .toBe(400);
        const responseBody = await response.json();
        // console.log('--- Response ตัวจริงจากหลังบ้าน ---');
        // console.log(JSON.stringify(responseBody, null, 2));
    expect(responseBody.message).toContain('JSON parse error: Cannot deserialize value of type `java.lang.Long` from String "abc"');
    });


    test('TC_POST_06 : Create employee failed with invalid lastname format and validate default Message -> Status 400' , async ({ request }) => {
        const response = await request.post(BASE_URL , {
            data : {
                dob : "2001-01-01",
                email : "test06@gmail.com",
                firstName : "Laula",
                id : 0,
                lastName : ""
            }
        });
    expect(response.status()) .toBe(400);
        const responseBody = await response.json();
            // console.log('--- Response ตัวจริงจากหลังบ้าน ---');
            // console.log(JSON.stringify(responseBody, null, 2));
    expect(responseBody.errors[0].defaultMessage) .toMatch(/mandatory|size/);
    });
});



test.describe('Scenario_02: Get Employee API Testing', () => {
    // test('TC_GET_01 : Get employee by existing ID -> Status 200', async ({ request }) => {    
    //     const response = await request.get(`${BASE_URL}/1`);                        
    // expect(response.status()) .toBe(200);
    //     const responseBody = await response.json();
    //     // console.log('--- ข้อมูลพนักงานที่ดึงได้จริง ---');
    //     // console.log(JSON.stringify(responseBody, null, 2));
    // expect(responseBody.id).toBe(1);
    // expect(responseBody.firstName).toBe('Anya');
    // });


     test('TC_GET_02 : Get employee failed when ID is not existing -> Status 404', async ({ request }) => {
            const targetId = 999;
            const response = await request.get(`${BASE_URL}/${targetId}`);
        expect(response.status()).toBe(404);
            const responseBody = await response.text();
            // console.log('--- Response จริงของ GET เมื่อไม่พบ ID ---');
            // console.log(responseBody);
        expect(responseBody).toBe(`Employee not found with ID ${targetId}`);    
    });


     test('TC_GET_03 : Get employee failed with invalid ID format -> Status 400', async ({ request }) => {    
        const response = await request.get(`${BASE_URL}/abc`);
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        // console.log('--- Response จริงของ GET เมื่อ ID ผิดฟอร์แมต ---');
        // console.log(JSON.stringify(responseBody, null, 2));
        expect(responseBody.message).toContain("Failed to convert value of type 'java.lang.String' to required type 'java.lang.Long'");
    });
});
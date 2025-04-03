import * as XLSX from 'xlsx';

/**
 * Download basic job applications as Excel
 * @param {Array} applications - List of job applications
 * @param {String} categoryName - Name of the job category
 * @param {Boolean} detailed - Whether to include detailed information
 */
export const downloadJobApplicationsExcel = (applications, categoryName, detailed = false) => {
    if (!applications || applications.length === 0) return;
    
    let data;
    let filename;
    
    if (detailed) {
        // Create detailed worksheet with all candidate information
        data = applications.map(app => ({
            'ID': app.id,
            'Name': app.name,
            'Email': app.email,
            'Phone': app.phone,
            'Job': app.job_vacancy?.title,
            'Status': app.status || 'Pending',
            'Birth Place': app.birthPlace,
            'Birth Date': app.birthDate ? new Date(app.birthDate).toLocaleDateString() : '',
            'Gender': app.sex ? 'Male' : 'Female',
            'Marital Status': app.maritalStatusId,
            'Children': app.numberOfChild,
            'Religion': app.religionId,
            'Blood Type': app.bloodType,
            'Nationality': app.nationalityId,
            'Address': app.address,
            'City': app.city,
            'Zip Code': app.zipCode,
            'Country': app.countryId,
            'Rank to Apply': app.rankToApply,
            'Apply Date': app.rankApplyDate ? new Date(app.rankApplyDate).toLocaleDateString() : '',
            'Height': app.height,
            'Weight': app.weight,
            'Certificate ID': app.certificateId,
            'Certificate No': app.certificateNo,
            'Certificate Status': app.certificateStatusId,
            'Certificate Issued By': app.certificateIssued,
            'Certificate Issue Date': app.certificateIssuedDate ? new Date(app.certificateIssuedDate).toLocaleDateString() : '',
            'Certificate Expiry Date': app.certificateExpiryDate ? new Date(app.certificateExpiryDate).toLocaleDateString() : ''
        }));
        
        filename = `${categoryName}_Detailed_Applications.xlsx`;
    } else {
        // Create basic worksheet with minimal information
        data = applications.map(app => ({
            'ID': app.id,
            'Name': app.name,
            'Email': app.email,
            'Phone': app.phone,
            'Job': app.job_vacancy?.title,
            'Status': app.status || 'Pending'
        }));
        
        filename = `${categoryName}_Applications.xlsx`;
    }
    
    // Create workbook and add the worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Job Applications');
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, filename);
};

/**
 * Download single candidate details as Excel
 * @param {Object} candidate - Candidate object with all details
 */
export const downloadCandidateExcel = (candidate) => {
    if (!candidate) return;
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    // Personal Info Sheet
    const personalInfo = [{
        'ID': candidate.id,
        'Name': candidate.name,
        'Email': candidate.email,
        'Phone': candidate.phone_no,
        'Mobile': candidate.phone_no,
        'Birth Place': candidate.birth_place,
        'Birth Date': candidate.birth_date ? new Date(candidate.birth_date).toLocaleDateString() : '',
        'Gender': candidate.sex ? 'Male' : 'Female',
        'Marital Status': candidate.marital_status_name,
        'Children': candidate.number_of_child,
        'Religion': candidate.religion_name,
        'Blood Type': candidate.blood_type,
        'Nationality': candidate.nationality_name,
        'Address': candidate.address,
        'City': candidate.city,
        'Zip Code': candidate.zip_code,
        'Country': candidate.country_name,
        'Status': candidate.status || 'Pending'
    }];
    
    const personalSheet = XLSX.utils.json_to_sheet(personalInfo);
    XLSX.utils.book_append_sheet(workbook, personalSheet, 'Personal Info');
    
    // Physical Info Sheet
    const physicalInfo = [{
        'Height': candidate.height,
        'Weight': candidate.weight,
        'White Shirt': candidate.white_shirt,
        'Blue Pants': candidate.blue_pants,
        'Overall': candidate.overall,
        'Safety Shoes': candidate.safety_shoes,
        'Winter Jacket': candidate.winter_jacket
    }];
    
    const physicalSheet = XLSX.utils.json_to_sheet(physicalInfo);
    XLSX.utils.book_append_sheet(workbook, physicalSheet, 'Physical Info');
    
    // Certificate Info Sheet
    const certificateInfo = [{
        'Certificate ID': candidate.certificate_id,
        'Certificate No': candidate.certificate_no,
        'Certificate Status': candidate.certificate_status_id,
        'Certificate Issued By': candidate.certificate_issued,
        'Certificate Issue Date': candidate.certificate_issued_date ? new Date(candidate.certificate_issued_date).toLocaleDateString() : '',
        'Certificate Expiry Date': candidate.certificate_expiry_date ? new Date(candidate.certificate_expiry_date).toLocaleDateString() : '',
        'Rank to Apply': candidate.rank_to_apply,
        'Apply Date': candidate.rank_apply_date ? new Date(candidate.rank_apply_date).toLocaleDateString() : ''
    }];
    
    const certificateSheet = XLSX.utils.json_to_sheet(certificateInfo);
    XLSX.utils.book_append_sheet(workbook, certificateSheet, 'Certificate Info');
    
    // Documents Sheet
    if (candidate.documents && candidate.documents.length > 0) {
        const documents = candidate.documents.map(doc => ({
            'Document ID': doc.doc_id,
            'Document No': doc.doc_no,
            'Issued By': doc.issued,
            'Valid Date': doc.valid_date ? new Date(doc.valid_date).toLocaleDateString() : '',
            'Expiry Date': doc.expired_date ? new Date(doc.expired_date).toLocaleDateString() : '',
            'Remark': doc.remark
        }));
        
        const documentsSheet = XLSX.utils.json_to_sheet(documents);
        XLSX.utils.book_append_sheet(workbook, documentsSheet, 'Documents');
    }
    
    // Trainings Sheet
    if (candidate.trainings && candidate.trainings.length > 0) {
        const trainings = candidate.trainings.map(training => ({
            'Training ID': training.training_id,
            'Reference ID': training.reference_id,
            'Certificate No': training.certificate_no,
            'Valid Date': training.valid_date ? new Date(training.valid_date).toLocaleDateString() : '',
            'Expiry Date': training.expired_date ? new Date(training.expired_date).toLocaleDateString() : ''
        }));
        
        const trainingsSheet = XLSX.utils.json_to_sheet(trainings);
        XLSX.utils.book_append_sheet(workbook, trainingsSheet, 'Trainings');
    }
    
    // Experiences Sheet
    if (candidate.experiences && candidate.experiences.length > 0) {
        const experiences = candidate.experiences.map(exp => ({
            'Vessel': exp.vessel,
            'Vessel Type': exp.vessel_type,
            'Flag': exp.flag,
            'Trading Area': exp.trading_area_id,
            'Rank': exp.rank,
            'DWT': exp.dwt,
            'KWH': exp.kwh,
            'Owner': exp.owner,
            'Sign On': exp.sign_on ? new Date(exp.sign_on).toLocaleDateString() : '',
            'Sign Off': exp.sign_off ? new Date(exp.sign_off).toLocaleDateString() : '',
            'Reason': exp.sign_off_reason
        }));
        
        const experiencesSheet = XLSX.utils.json_to_sheet(experiences);
        XLSX.utils.book_append_sheet(workbook, experiencesSheet, 'Experiences');
    }
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Candidate_${candidate.name.replace(/\s+/g, '_')}.xlsx`);
};
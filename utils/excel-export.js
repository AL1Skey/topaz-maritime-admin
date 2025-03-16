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
        'Phone': candidate.phoneNo,
        'Mobile': candidate.handPhone,
        'Birth Place': candidate.birthPlace,
        'Birth Date': candidate.birthDate ? new Date(candidate.birthDate).toLocaleDateString() : '',
        'Gender': candidate.sex ? 'Male' : 'Female',
        'Marital Status': candidate.maritalStatusId,
        'Children': candidate.numberOfChild,
        'Religion': candidate.religionId,
        'Blood Type': candidate.bloodType,
        'Nationality': candidate.nationalityId,
        'Address': candidate.address,
        'City': candidate.city,
        'Zip Code': candidate.zipCode,
        'Country': candidate.countryId,
        'Status': candidate.status || 'Pending'
    }];
    
    const personalSheet = XLSX.utils.json_to_sheet(personalInfo);
    XLSX.utils.book_append_sheet(workbook, personalSheet, 'Personal Info');
    
    // Physical Info Sheet
    const physicalInfo = [{
        'Height': candidate.height,
        'Weight': candidate.weight,
        'White Shirt': candidate.whiteShirt,
        'Blue Pants': candidate.bluePants,
        'Overall': candidate.overall,
        'Safety Shoes': candidate.safetyShoes,
        'Winter Jacket': candidate.winterJacket
    }];
    
    const physicalSheet = XLSX.utils.json_to_sheet(physicalInfo);
    XLSX.utils.book_append_sheet(workbook, physicalSheet, 'Physical Info');
    
    // Certificate Info Sheet
    const certificateInfo = [{
        'Certificate ID': candidate.certificateId,
        'Certificate No': candidate.certificateNo,
        'Certificate Status': candidate.certificateStatusId,
        'Certificate Issued By': candidate.certificateIssued,
        'Certificate Issue Date': candidate.certificateIssuedDate ? new Date(candidate.certificateIssuedDate).toLocaleDateString() : '',
        'Certificate Expiry Date': candidate.certificateExpiryDate ? new Date(candidate.certificateExpiryDate).toLocaleDateString() : '',
        'Rank to Apply': candidate.rankToApply,
        'Apply Date': candidate.rankApplyDate ? new Date(candidate.rankApplyDate).toLocaleDateString() : ''
    }];
    
    const certificateSheet = XLSX.utils.json_to_sheet(certificateInfo);
    XLSX.utils.book_append_sheet(workbook, certificateSheet, 'Certificate Info');
    
    // Documents Sheet
    if (candidate.documents && candidate.documents.length > 0) {
        const documents = candidate.documents.map(doc => ({
            'Document ID': doc.docId,
            'Document No': doc.docNo,
            'Issued By': doc.issued,
            'Valid Date': doc.validDate ? new Date(doc.validDate).toLocaleDateString() : '',
            'Expiry Date': doc.expiredDate ? new Date(doc.expiredDate).toLocaleDateString() : '',
            'Remark': doc.remark
        }));
        
        const documentsSheet = XLSX.utils.json_to_sheet(documents);
        XLSX.utils.book_append_sheet(workbook, documentsSheet, 'Documents');
    }
    
    // Trainings Sheet
    if (candidate.trainings && candidate.trainings.length > 0) {
        const trainings = candidate.trainings.map(training => ({
            'Training ID': training.trainingId,
            'Reference ID': training.referenceId,
            'Certificate No': training.certificateNo,
            'Valid Date': training.validDate ? new Date(training.validDate).toLocaleDateString() : '',
            'Expiry Date': training.expiredDate ? new Date(training.expiredDate).toLocaleDateString() : ''
        }));
        
        const trainingsSheet = XLSX.utils.json_to_sheet(trainings);
        XLSX.utils.book_append_sheet(workbook, trainingsSheet, 'Trainings');
    }
    
    // Experiences Sheet
    if (candidate.experiences && candidate.experiences.length > 0) {
        const experiences = candidate.experiences.map(exp => ({
            'Vessel': exp.vessel,
            'Vessel Type': exp.vesselType,
            'Flag': exp.flag,
            'Trading Area': exp.tradingAreaId,
            'Rank': exp.rank,
            'DWT': exp.dwt,
            'KWH': exp.kwh,
            'Owner': exp.owner,
            'Sign On': exp.signOn ? new Date(exp.signOn).toLocaleDateString() : '',
            'Sign Off': exp.signOff ? new Date(exp.signOff).toLocaleDateString() : '',
            'Reason': exp.signOffReason
        }));
        
        const experiencesSheet = XLSX.utils.json_to_sheet(experiences);
        XLSX.utils.book_append_sheet(workbook, experiencesSheet, 'Experiences');
    }
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Candidate_${candidate.name.replace(/\s+/g, '_')}.xlsx`);
};
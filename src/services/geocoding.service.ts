// src/services/geocoding.service.ts
// Geocoding service abstraction
// Currently uses mock data; ready to connect WeatherAPI or Google Geocoding API later

export interface GeocodingResult {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  display: string;
}

// Mock worldwide locations database (fallback when WeatherAPI search is unavailable)
const MOCK_LOCATIONS: GeocodingResult[] = [
  // ========== INDIA — 28 States + 8 Union Territories ==========

  // --- Union Territories ---
  { id: 'in-delhi', name: 'New Delhi', region: 'Delhi', country: 'India', lat: 28.61, lon: 77.23, display: 'New Delhi, Delhi, India' },
  { id: 'in-chandigarh', name: 'Chandigarh', region: 'Chandigarh', country: 'India', lat: 30.73, lon: 76.78, display: 'Chandigarh, Chandigarh, India' },
  { id: 'in-jammu', name: 'Jammu', region: 'Jammu & Kashmir', country: 'India', lat: 32.73, lon: 74.87, display: 'Jammu, Jammu & Kashmir, India' },
  { id: 'in-srinagar', name: 'Srinagar', region: 'Jammu & Kashmir', country: 'India', lat: 34.08, lon: 74.80, display: 'Srinagar, Jammu & Kashmir, India' },
  { id: 'in-leh', name: 'Leh', region: 'Ladakh', country: 'India', lat: 34.15, lon: 77.58, display: 'Leh, Ladakh, India' },
  { id: 'in-puducherry', name: 'Puducherry', region: 'Puducherry', country: 'India', lat: 11.94, lon: 79.81, display: 'Puducherry, Puducherry, India' },
  { id: 'in-portblair', name: 'Port Blair', region: 'Andaman & Nicobar Islands', country: 'India', lat: 11.62, lon: 92.73, display: 'Port Blair, Andaman & Nicobar Islands, India' },
  { id: 'in-silvassa', name: 'Silvassa', region: 'Dadra & Nagar Haveli and Daman & Diu', country: 'India', lat: 20.27, lon: 73.01, display: 'Silvassa, Dadra & Nagar Haveli, India' },
  { id: 'in-daman', name: 'Daman', region: 'Dadra & Nagar Haveli and Daman & Diu', country: 'India', lat: 20.42, lon: 72.85, display: 'Daman, Daman & Diu, India' },
  { id: 'in-kavaratti', name: 'Kavaratti', region: 'Lakshadweep', country: 'India', lat: 10.57, lon: 72.64, display: 'Kavaratti, Lakshadweep, India' },

  // --- Andhra Pradesh ---
  { id: 'in-visor', name: 'Visakhapatnam', region: 'Andhra Pradesh', country: 'India', lat: 17.69, lon: 83.22, display: 'Visakhapatnam, Andhra Pradesh, India' },
  { id: 'in-vijayawada', name: 'Vijayawada', region: 'Andhra Pradesh', country: 'India', lat: 16.51, lon: 80.62, display: 'Vijayawada, Andhra Pradesh, India' },
  { id: 'in-guntur', name: 'Guntur', region: 'Andhra Pradesh', country: 'India', lat: 16.31, lon: 80.44, display: 'Guntur, Andhra Pradesh, India' },
  { id: 'in-tirupati', name: 'Tirupati', region: 'Andhra Pradesh', country: 'India', lat: 13.63, lon: 79.42, display: 'Tirupati, Andhra Pradesh, India' },

  // --- Arunachal Pradesh ---
  { id: 'in-itanagar', name: 'Itanagar', region: 'Arunachal Pradesh', country: 'India', lat: 27.10, lon: 93.69, display: 'Itanagar, Arunachal Pradesh, India' },
  { id: 'in-tawang', name: 'Tawang', region: 'Arunachal Pradesh', country: 'India', lat: 27.59, lon: 91.87, display: 'Tawang, Arunachal Pradesh, India' },

  // --- Assam ---
  { id: 'in-guwahati', name: 'Guwahati', region: 'Assam', country: 'India', lat: 26.14, lon: 91.74, display: 'Guwahati, Assam, India' },
  { id: 'in-silchar', name: 'Silchar', region: 'Assam', country: 'India', lat: 24.83, lon: 92.80, display: 'Silchar, Assam, India' },
  { id: 'in-dibrugarh', name: 'Dibrugarh', region: 'Assam', country: 'India', lat: 27.47, lon: 94.91, display: 'Dibrugarh, Assam, India' },

  // --- Bihar ---
  { id: 'in-patna', name: 'Patna', region: 'Bihar', country: 'India', lat: 25.60, lon: 85.10, display: 'Patna, Bihar, India' },
  { id: 'in-gaya', name: 'Gaya', region: 'Bihar', country: 'India', lat: 24.77, lon: 85.00, display: 'Gaya, Bihar, India' },
  { id: 'in-muzaffarpur', name: 'Muzaffarpur', region: 'Bihar', country: 'India', lat: 26.12, lon: 85.40, display: 'Muzaffarpur, Bihar, India' },
  { id: 'in-bhagalpur', name: 'Bhagalpur', region: 'Bihar', country: 'India', lat: 25.24, lon: 86.98, display: 'Bhagalpur, Bihar, India' },

  // --- Chhattisgarh ---
  { id: 'in-raipur', name: 'Raipur', region: 'Chhattisgarh', country: 'India', lat: 21.25, lon: 81.63, display: 'Raipur, Chhattisgarh, India' },
  { id: 'in-bilaspur-cg', name: 'Bilaspur', region: 'Chhattisgarh', country: 'India', lat: 22.08, lon: 82.15, display: 'Bilaspur, Chhattisgarh, India' },

  // --- Goa ---
  { id: 'in-panaji', name: 'Panaji', region: 'Goa', country: 'India', lat: 15.50, lon: 73.83, display: 'Panaji, Goa, India' },
  { id: 'in-margao', name: 'Margao', region: 'Goa', country: 'India', lat: 15.27, lon: 73.96, display: 'Margao, Goa, India' },

  // --- Gujarat ---
  { id: 'in-ahmedabad', name: 'Ahmedabad', region: 'Gujarat', country: 'India', lat: 23.02, lon: 72.57, display: 'Ahmedabad, Gujarat, India' },
  { id: 'in-surat', name: 'Surat', region: 'Gujarat', country: 'India', lat: 21.17, lon: 72.83, display: 'Surat, Gujarat, India' },
  { id: 'in-vadodara', name: 'Vadodara', region: 'Gujarat', country: 'India', lat: 22.31, lon: 73.19, display: 'Vadodara, Gujarat, India' },
  { id: 'in-rajkot', name: 'Rajkot', region: 'Gujarat', country: 'India', lat: 22.30, lon: 70.80, display: 'Rajkot, Gujarat, India' },
  { id: 'in-gandhinagar', name: 'Gandhinagar', region: 'Gujarat', country: 'India', lat: 23.22, lon: 72.64, display: 'Gandhinagar, Gujarat, India' },

  // --- Haryana ---
  { id: 'in-gurgaon', name: 'Gurugram', region: 'Haryana', country: 'India', lat: 28.46, lon: 77.03, display: 'Gurugram, Haryana, India' },
  { id: 'in-faridabad', name: 'Faridabad', region: 'Haryana', country: 'India', lat: 28.41, lon: 77.32, display: 'Faridabad, Haryana, India' },
  { id: 'in-ambala', name: 'Ambala', region: 'Haryana', country: 'India', lat: 30.38, lon: 76.78, display: 'Ambala, Haryana, India' },
  { id: 'in-panipat', name: 'Panipat', region: 'Haryana', country: 'India', lat: 29.39, lon: 76.97, display: 'Panipat, Haryana, India' },

  // --- Himachal Pradesh ---
  { id: 'in-shimla', name: 'Shimla', region: 'Himachal Pradesh', country: 'India', lat: 31.10, lon: 77.17, display: 'Shimla, Himachal Pradesh, India' },
  { id: 'in-manali', name: 'Manali', region: 'Himachal Pradesh', country: 'India', lat: 32.24, lon: 77.19, display: 'Manali, Himachal Pradesh, India' },
  { id: 'in-dharamshala', name: 'Dharamshala', region: 'Himachal Pradesh', country: 'India', lat: 32.22, lon: 76.32, display: 'Dharamshala, Himachal Pradesh, India' },
  { id: 'in-kullu', name: 'Kullu', region: 'Himachal Pradesh', country: 'India', lat: 31.96, lon: 77.11, display: 'Kullu, Himachal Pradesh, India' },

  // --- Jharkhand ---
  { id: 'in-ranchi', name: 'Ranchi', region: 'Jharkhand', country: 'India', lat: 23.34, lon: 85.31, display: 'Ranchi, Jharkhand, India' },
  { id: 'in-jamshedpur', name: 'Jamshedpur', region: 'Jharkhand', country: 'India', lat: 22.80, lon: 86.18, display: 'Jamshedpur, Jharkhand, India' },
  { id: 'in-dhanbad', name: 'Dhanbad', region: 'Jharkhand', country: 'India', lat: 23.79, lon: 86.43, display: 'Dhanbad, Jharkhand, India' },
  { id: 'in-bokaro', name: 'Bokaro', region: 'Jharkhand', country: 'India', lat: 23.67, lon: 86.15, display: 'Bokaro, Jharkhand, India' },

  // --- Karnataka ---
  { id: 'in-bengaluru', name: 'Bengaluru', region: 'Karnataka', country: 'India', lat: 12.97, lon: 77.59, display: 'Bengaluru, Karnataka, India' },
  { id: 'in-mysuru', name: 'Mysuru', region: 'Karnataka', country: 'India', lat: 12.30, lon: 76.66, display: 'Mysuru, Karnataka, India' },
  { id: 'in-mangaluru', name: 'Mangaluru', region: 'Karnataka', country: 'India', lat: 12.87, lon: 74.88, display: 'Mangaluru, Karnataka, India' },
  { id: 'in-hubli', name: 'Hubli-Dharwad', region: 'Karnataka', country: 'India', lat: 15.36, lon: 75.12, display: 'Hubli-Dharwad, Karnataka, India' },
  { id: 'in-belgaum', name: 'Belgaum', region: 'Karnataka', country: 'India', lat: 15.85, lon: 74.50, display: 'Belgaum, Karnataka, India' },

  // --- Kerala ---
  { id: 'in-thiruvananthapuram', name: 'Thiruvananthapuram', region: 'Kerala', country: 'India', lat: 8.52, lon: 76.94, display: 'Thiruvananthapuram, Kerala, India' },
  { id: 'in-kochi', name: 'Kochi', region: 'Kerala', country: 'India', lat: 9.93, lon: 76.27, display: 'Kochi, Kerala, India' },
  { id: 'in-kozhikode', name: 'Kozhikode', region: 'Kerala', country: 'India', lat: 11.26, lon: 75.78, display: 'Kozhikode, Kerala, India' },
  { id: 'in-munnar', name: 'Munnar', region: 'Kerala', country: 'India', lat: 10.09, lon: 77.06, display: 'Munnar, Kerala, India' },
  { id: 'in-alappuzha', name: 'Alappuzha', region: 'Kerala', country: 'India', lat: 9.50, lon: 76.34, display: 'Alappuzha, Kerala, India' },

  // --- Madhya Pradesh ---
  { id: 'in-bhopal', name: 'Bhopal', region: 'Madhya Pradesh', country: 'India', lat: 23.26, lon: 77.41, display: 'Bhopal, Madhya Pradesh, India' },
  { id: 'in-indore', name: 'Indore', region: 'Madhya Pradesh', country: 'India', lat: 22.72, lon: 75.86, display: 'Indore, Madhya Pradesh, India' },
  { id: 'in-gwalior', name: 'Gwalior', region: 'Madhya Pradesh', country: 'India', lat: 26.22, lon: 78.18, display: 'Gwalior, Madhya Pradesh, India' },
  { id: 'in-jabalpur', name: 'Jabalpur', region: 'Madhya Pradesh', country: 'India', lat: 23.18, lon: 79.95, display: 'Jabalpur, Madhya Pradesh, India' },
  { id: 'in-ujjain', name: 'Ujjain', region: 'Madhya Pradesh', country: 'India', lat: 23.18, lon: 75.78, display: 'Ujjain, Madhya Pradesh, India' },

  // --- Maharashtra ---
  { id: 'in-mumbai', name: 'Mumbai', region: 'Maharashtra', country: 'India', lat: 19.08, lon: 72.88, display: 'Mumbai, Maharashtra, India' },
  { id: 'in-pune', name: 'Pune', region: 'Maharashtra', country: 'India', lat: 18.52, lon: 73.86, display: 'Pune, Maharashtra, India' },
  { id: 'in-nagpur', name: 'Nagpur', region: 'Maharashtra', country: 'India', lat: 21.15, lon: 79.09, display: 'Nagpur, Maharashtra, India' },
  { id: 'in-nashik', name: 'Nashik', region: 'Maharashtra', country: 'India', lat: 19.99, lon: 73.79, display: 'Nashik, Maharashtra, India' },
  { id: 'in-aurangabad', name: 'Aurangabad', region: 'Maharashtra', country: 'India', lat: 19.88, lon: 75.34, display: 'Aurangabad, Maharashtra, India' },
  { id: 'in-thane', name: 'Thane', region: 'Maharashtra', country: 'India', lat: 19.22, lon: 72.98, display: 'Thane, Maharashtra, India' },

  // --- Manipur ---
  { id: 'in-imphal', name: 'Imphal', region: 'Manipur', country: 'India', lat: 24.81, lon: 93.94, display: 'Imphal, Manipur, India' },

  // --- Meghalaya ---
  { id: 'in-shillong', name: 'Shillong', region: 'Meghalaya', country: 'India', lat: 25.58, lon: 91.89, display: 'Shillong, Meghalaya, India' },
  { id: 'in-cherrapunji', name: 'Cherrapunji', region: 'Meghalaya', country: 'India', lat: 25.30, lon: 91.73, display: 'Cherrapunji, Meghalaya, India' },

  // --- Mizoram ---
  { id: 'in-aizawl', name: 'Aizawl', region: 'Mizoram', country: 'India', lat: 23.73, lon: 92.72, display: 'Aizawl, Mizoram, India' },

  // --- Nagaland ---
  { id: 'in-kohima', name: 'Kohima', region: 'Nagaland', country: 'India', lat: 25.67, lon: 94.11, display: 'Kohima, Nagaland, India' },
  { id: 'in-dimapur', name: 'Dimapur', region: 'Nagaland', country: 'India', lat: 25.91, lon: 93.73, display: 'Dimapur, Nagaland, India' },

  // --- Odisha ---
  { id: 'in-bhubaneswar', name: 'Bhubaneswar', region: 'Odisha', country: 'India', lat: 20.30, lon: 85.82, display: 'Bhubaneswar, Odisha, India' },
  { id: 'in-cuttack', name: 'Cuttack', region: 'Odisha', country: 'India', lat: 20.46, lon: 85.88, display: 'Cuttack, Odisha, India' },
  { id: 'in-puri', name: 'Puri', region: 'Odisha', country: 'India', lat: 19.81, lon: 85.83, display: 'Puri, Odisha, India' },

  // --- Punjab ---
  { id: 'in-ludhiana', name: 'Ludhiana', region: 'Punjab', country: 'India', lat: 30.90, lon: 75.86, display: 'Ludhiana, Punjab, India' },
  { id: 'in-amritsar', name: 'Amritsar', region: 'Punjab', country: 'India', lat: 31.63, lon: 74.87, display: 'Amritsar, Punjab, India' },
  { id: 'in-jalandhar', name: 'Jalandhar', region: 'Punjab', country: 'India', lat: 31.33, lon: 75.58, display: 'Jalandhar, Punjab, India' },
  { id: 'in-patiala', name: 'Patiala', region: 'Punjab', country: 'India', lat: 30.34, lon: 76.39, display: 'Patiala, Punjab, India' },

  // --- Rajasthan ---
  { id: 'in-jaipur', name: 'Jaipur', region: 'Rajasthan', country: 'India', lat: 26.92, lon: 75.79, display: 'Jaipur, Rajasthan, India' },
  { id: 'in-jodhpur', name: 'Jodhpur', region: 'Rajasthan', country: 'India', lat: 26.24, lon: 73.02, display: 'Jodhpur, Rajasthan, India' },
  { id: 'in-udaipur', name: 'Udaipur', region: 'Rajasthan', country: 'India', lat: 24.58, lon: 73.68, display: 'Udaipur, Rajasthan, India' },
  { id: 'in-ajmer', name: 'Ajmer', region: 'Rajasthan', country: 'India', lat: 26.45, lon: 74.64, display: 'Ajmer, Rajasthan, India' },
  { id: 'in-kota', name: 'Kota', region: 'Rajasthan', country: 'India', lat: 25.18, lon: 75.85, display: 'Kota, Rajasthan, India' },

  // --- Sikkim ---
  { id: 'in-gangtok', name: 'Gangtok', region: 'Sikkim', country: 'India', lat: 27.34, lon: 88.61, display: 'Gangtok, Sikkim, India' },

  // --- Tamil Nadu ---
  { id: 'in-chennai', name: 'Chennai', region: 'Tamil Nadu', country: 'India', lat: 13.08, lon: 80.27, display: 'Chennai, Tamil Nadu, India' },
  { id: 'in-coimbatore', name: 'Coimbatore', region: 'Tamil Nadu', country: 'India', lat: 11.01, lon: 76.97, display: 'Coimbatore, Tamil Nadu, India' },
  { id: 'in-madurai', name: 'Madurai', region: 'Tamil Nadu', country: 'India', lat: 9.93, lon: 78.12, display: 'Madurai, Tamil Nadu, India' },
  { id: 'in-ooty', name: 'Ooty', region: 'Tamil Nadu', country: 'India', lat: 11.41, lon: 76.70, display: 'Ooty, Tamil Nadu, India' },
  { id: 'in-kancheepuram', name: 'Kancheepuram', region: 'Tamil Nadu', country: 'India', lat: 12.83, lon: 79.70, display: 'Kancheepuram, Tamil Nadu, India' },
  { id: 'in-trichy', name: 'Tiruchirappalli', region: 'Tamil Nadu', country: 'India', lat: 10.79, lon: 78.70, display: 'Tiruchirappalli, Tamil Nadu, India' },

  // --- Telangana ---
  { id: 'in-hyderabad', name: 'Hyderabad', region: 'Telangana', country: 'India', lat: 17.39, lon: 78.49, display: 'Hyderabad, Telangana, India' },
  { id: 'in-warangal', name: 'Warangal', region: 'Telangana', country: 'India', lat: 17.98, lon: 79.60, display: 'Warangal, Telangana, India' },
  { id: 'in-nizamabad', name: 'Nizamabad', region: 'Telangana', country: 'India', lat: 18.67, lon: 78.10, display: 'Nizamabad, Telangana, India' },

  // --- Tripura ---
  { id: 'in-agartala', name: 'Agartala', region: 'Tripura', country: 'India', lat: 23.83, lon: 91.28, display: 'Agartala, Tripura, India' },

  // --- Uttar Pradesh ---
  { id: 'in-lucknow', name: 'Lucknow', region: 'Uttar Pradesh', country: 'India', lat: 26.85, lon: 80.95, display: 'Lucknow, Uttar Pradesh, India' },
  { id: 'in-agra', name: 'Agra', region: 'Uttar Pradesh', country: 'India', lat: 27.18, lon: 78.02, display: 'Agra, Uttar Pradesh, India' },
  { id: 'in-varanasi', name: 'Varanasi', region: 'Uttar Pradesh', country: 'India', lat: 25.32, lon: 83.01, display: 'Varanasi, Uttar Pradesh, India' },
  { id: 'in-prayagraj', name: 'Prayagraj', region: 'Uttar Pradesh', country: 'India', lat: 25.43, lon: 81.85, display: 'Prayagraj, Uttar Pradesh, India' },
  { id: 'in-noida', name: 'Noida', region: 'Uttar Pradesh', country: 'India', lat: 28.57, lon: 77.33, display: 'Noida, Uttar Pradesh, India' },
  { id: 'in-greater-noida', name: 'Greater Noida', region: 'Uttar Pradesh', country: 'India', lat: 28.47, lon: 77.50, display: 'Greater Noida, Uttar Pradesh, India' },
  { id: 'in-kanpur', name: 'Kanpur', region: 'Uttar Pradesh', country: 'India', lat: 26.45, lon: 80.35, display: 'Kanpur, Uttar Pradesh, India' },
  { id: 'in-meerut', name: 'Meerut', region: 'Uttar Pradesh', country: 'India', lat: 28.99, lon: 77.71, display: 'Meerut, Uttar Pradesh, India' },
  { id: 'in-gorakhpur', name: 'Gorakhpur', region: 'Uttar Pradesh', country: 'India', lat: 26.76, lon: 83.37, display: 'Gorakhpur, Uttar Pradesh, India' },
  { id: 'in-ayodhya', name: 'Ayodhya', region: 'Uttar Pradesh', country: 'India', lat: 26.80, lon: 82.20, display: 'Ayodhya, Uttar Pradesh, India' },
  { id: 'in-mathura', name: 'Mathura', region: 'Uttar Pradesh', country: 'India', lat: 27.49, lon: 77.67, display: 'Mathura, Uttar Pradesh, India' },

  // --- Uttarakhand ---
  { id: 'in-dehradun', name: 'Dehradun', region: 'Uttarakhand', country: 'India', lat: 30.32, lon: 78.03, display: 'Dehradun, Uttarakhand, India' },
  { id: 'in-haridwar', name: 'Haridwar', region: 'Uttarakhand', country: 'India', lat: 29.95, lon: 78.16, display: 'Haridwar, Uttarakhand, India' },
  { id: 'in-nainital', name: 'Nainital', region: 'Uttarakhand', country: 'India', lat: 29.38, lon: 79.45, display: 'Nainital, Uttarakhand, India' },
  { id: 'in-mussoorie', name: 'Mussoorie', region: 'Uttarakhand', country: 'India', lat: 30.46, lon: 78.06, display: 'Mussoorie, Uttarakhand, India' },

  // --- West Bengal ---
  { id: 'in-kolkata', name: 'Kolkata', region: 'West Bengal', country: 'India', lat: 22.57, lon: 88.36, display: 'Kolkata, West Bengal, India' },
  { id: 'in-darjeeling', name: 'Darjeeling', region: 'West Bengal', country: 'India', lat: 27.04, lon: 88.26, display: 'Darjeeling, West Bengal, India' },
  { id: 'in-siliguri', name: 'Siliguri', region: 'West Bengal', country: 'India', lat: 26.71, lon: 88.43, display: 'Siliguri, West Bengal, India' },
  { id: 'in-durgapur', name: 'Durgapur', region: 'West Bengal', country: 'India', lat: 23.55, lon: 87.32, display: 'Durgapur, West Bengal, India' },

  // --- Delhi Localities ---
  { id: 'in-dl-sb', name: 'Shaheen Bagh', region: 'New Delhi, Delhi', country: 'India', lat: 28.56, lon: 77.28, display: 'Shaheen Bagh, New Delhi, Delhi, India' },
  { id: 'in-dl-cp', name: 'Connaught Place', region: 'New Delhi, Delhi', country: 'India', lat: 28.63, lon: 77.22, display: 'Connaught Place, New Delhi, Delhi, India' },
  { id: 'in-dl-dw', name: 'Dwarka', region: 'New Delhi, Delhi', country: 'India', lat: 28.59, lon: 77.05, display: 'Dwarka, New Delhi, Delhi, India' },
  { id: 'in-dl-rohini', name: 'Rohini', region: 'New Delhi, Delhi', country: 'India', lat: 28.75, lon: 77.07, display: 'Rohini, New Delhi, Delhi, India' },

  // --- Maharashtra Localities ---
  { id: 'in-mum-and', name: 'Andheri', region: 'Mumbai, Maharashtra', country: 'India', lat: 19.12, lon: 72.85, display: 'Andheri, Mumbai, Maharashtra, India' },
  { id: 'in-mum-bc', name: 'Bandra', region: 'Mumbai, Maharashtra', country: 'India', lat: 19.06, lon: 72.83, display: 'Bandra, Mumbai, Maharashtra, India' },
  { id: 'in-mum-nc', name: 'Navi Mumbai', region: 'Maharashtra', country: 'India', lat: 19.03, lon: 73.03, display: 'Navi Mumbai, Maharashtra, India' },

  // UK
  { id: 'uk-lon', name: 'London', region: 'England', country: 'United Kingdom', lat: 51.51, lon: -0.13, display: 'London, England, United Kingdom' },
  { id: 'uk-man', name: 'Manchester', region: 'England', country: 'United Kingdom', lat: 53.48, lon: -2.24, display: 'Manchester, England, United Kingdom' },
  { id: 'uk-bir', name: 'Birmingham', region: 'England', country: 'United Kingdom', lat: 52.49, lon: -1.89, display: 'Birmingham, England, United Kingdom' },
  { id: 'uk-edi', name: 'Edinburgh', region: 'Scotland', country: 'United Kingdom', lat: 55.95, lon: -3.19, display: 'Edinburgh, Scotland, United Kingdom' },
  { id: 'uk-gla', name: 'Glasgow', region: 'Scotland', country: 'United Kingdom', lat: 55.86, lon: -4.25, display: 'Glasgow, Scotland, United Kingdom' },

  // USA
  { id: 'us-ny', name: 'New York', region: 'New York', country: 'United States', lat: 40.71, lon: -74.01, display: 'New York, New York, United States' },
  { id: 'us-la', name: 'Los Angeles', region: 'California', country: 'United States', lat: 34.05, lon: -118.24, display: 'Los Angeles, California, United States' },
  { id: 'us-chi', name: 'Chicago', region: 'Illinois', country: 'United States', lat: 41.88, lon: -87.63, display: 'Chicago, Illinois, United States' },
  { id: 'us-hou', name: 'Houston', region: 'Texas', country: 'United States', lat: 29.76, lon: -95.37, display: 'Houston, Texas, United States' },
  { id: 'us-sf', name: 'San Francisco', region: 'California', country: 'United States', lat: 37.77, lon: -122.42, display: 'San Francisco, California, United States' },
  { id: 'us-sf-mission', name: 'Mission District', region: 'San Francisco, California', country: 'United States', lat: 37.76, lon: -122.42, display: 'Mission District, San Francisco, California, United States' },
  { id: 'us-spring-il', name: 'Springfield', region: 'Illinois', country: 'United States', lat: 39.78, lon: -89.65, display: 'Springfield, Illinois, United States' },
  { id: 'us-spring-mo', name: 'Springfield', region: 'Missouri', country: 'United States', lat: 37.21, lon: -93.29, display: 'Springfield, Missouri, United States' },
  { id: 'us-sea', name: 'Seattle', region: 'Washington', country: 'United States', lat: 47.61, lon: -122.33, display: 'Seattle, Washington, United States' },
  { id: 'us-mia', name: 'Miami', region: 'Florida', country: 'United States', lat: 25.76, lon: -80.19, display: 'Miami, Florida, United States' },

  // Australia
  { id: 'au-syd', name: 'Sydney', region: 'New South Wales', country: 'Australia', lat: -33.87, lon: 151.21, display: 'Sydney, New South Wales, Australia' },
  { id: 'au-mel', name: 'Melbourne', region: 'Victoria', country: 'Australia', lat: -37.81, lon: 144.96, display: 'Melbourne, Victoria, Australia' },
  { id: 'au-bri', name: 'Brisbane', region: 'Queensland', country: 'Australia', lat: -27.47, lon: 153.03, display: 'Brisbane, Queensland, Australia' },
  { id: 'au-per', name: 'Perth', region: 'Western Australia', country: 'Australia', lat: -31.95, lon: 115.86, display: 'Perth, Western Australia, Australia' },

  // Canada
  { id: 'ca-tor', name: 'Toronto', region: 'Ontario', country: 'Canada', lat: 43.65, lon: -79.38, display: 'Toronto, Ontario, Canada' },
  { id: 'ca-van', name: 'Vancouver', region: 'British Columbia', country: 'Canada', lat: 49.28, lon: -123.12, display: 'Vancouver, British Columbia, Canada' },
  { id: 'ca-mtl', name: 'Montreal', region: 'Quebec', country: 'Canada', lat: 45.50, lon: -73.57, display: 'Montreal, Quebec, Canada' },

  // Germany
  { id: 'de-ber', name: 'Berlin', region: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.41, display: 'Berlin, Berlin, Germany' },
  { id: 'de-mun', name: 'Munich', region: 'Bavaria', country: 'Germany', lat: 48.14, lon: 11.58, display: 'Munich, Bavaria, Germany' },

  // France
  { id: 'fr-par', name: 'Paris', region: 'Île-de-France', country: 'France', lat: 48.86, lon: 2.35, display: 'Paris, Île-de-France, France' },
  { id: 'fr-lyo', name: 'Lyon', region: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.76, lon: 4.84, display: 'Lyon, Auvergne-Rhône-Alpes, France' },

  // Japan
  { id: 'jp-tok', name: 'Tokyo', region: 'Tokyo', country: 'Japan', lat: 35.68, lon: 139.69, display: 'Tokyo, Tokyo, Japan' },
  { id: 'jp-osa', name: 'Osaka', region: 'Osaka', country: 'Japan', lat: 34.69, lon: 135.50, display: 'Osaka, Osaka, Japan' },

  // Singapore
  { id: 'sg-sg', name: 'Singapore', region: 'Singapore', country: 'Singapore', lat: 1.35, lon: 103.82, display: 'Singapore, Singapore' },

  // UAE
  { id: 'ae-dub', name: 'Dubai', region: 'Dubai', country: 'United Arab Emirates', lat: 25.20, lon: 55.27, display: 'Dubai, Dubai, United Arab Emirates' },
  { id: 'ae-abu', name: 'Abu Dhabi', region: 'Abu Dhabi', country: 'United Arab Emirates', lat: 24.45, lon: 54.65, display: 'Abu Dhabi, Abu Dhabi, United Arab Emirates' },

  // Saudi Arabia
  { id: 'sa-riy', name: 'Riyadh', region: 'Riyadh', country: 'Saudi Arabia', lat: 24.71, lon: 46.68, display: 'Riyadh, Riyadh, Saudi Arabia' },

  // South Africa
  { id: 'za-joh', name: 'Johannesburg', region: 'Gauteng', country: 'South Africa', lat: -26.20, lon: 28.05, display: 'Johannesburg, Gauteng, South Africa' },
  { id: 'za-cap', name: 'Cape Town', region: 'Western Cape', country: 'South Africa', lat: -33.93, lon: 18.42, display: 'Cape Town, Western Cape, South Africa' },

  // Brazil
  { id: 'br-sao', name: 'São Paulo', region: 'São Paulo', country: 'Brazil', lat: -23.55, lon: -46.63, display: 'São Paulo, São Paulo, Brazil' },
  { id: 'br-rio', name: 'Rio de Janeiro', region: 'Rio de Janeiro', country: 'Brazil', lat: -22.91, lon: -43.17, display: 'Rio de Janeiro, Rio de Janeiro, Brazil' },
];

// Map internal city keys to geocoding IDs for backward compatibility
export const CITY_KEY_MAP: Record<string, string> = {
  'mumbai': 'in-mumbai',
  'new_delhi': 'in-delhi-nd',
  'london': 'uk-lon',
  'sydney': 'au-syd',
  'new_york': 'us-ny'
};

/**
 * Search locations by query string
 * Matches against name, region, country, and display text
 */
export function searchLocations(query: string): GeocodingResult[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  return MOCK_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(lowerQuery) ||
    loc.region.toLowerCase().includes(lowerQuery) ||
    loc.country.toLowerCase().includes(lowerQuery) ||
    loc.display.toLowerCase().includes(lowerQuery)
  ).slice(0, 8);
}

/**
 * Get location by internal city key (for backward compatibility)
 */
export function getLocationByKey(key: string): GeocodingResult | undefined {
  const id = CITY_KEY_MAP[key];
  return MOCK_LOCATIONS.find(loc => loc.id === id);
}

/**
 * Generate a stable internal key from a geocoding result
 */
export function generateCityKey(result: GeocodingResult): string {
  // Check if it matches a known city key
  for (const [key, id] of Object.entries(CITY_KEY_MAP)) {
    if (id === result.id) return key;
  }
  // Otherwise generate a slug from the name
  return result.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

/**
 * Save selected location to localStorage
 */
export function saveSelectedLocation(result: GeocodingResult): void {
  const key = generateCityKey(result);
  localStorage.setItem('mausam_city', key);
  localStorage.setItem('mausam_location', JSON.stringify(result));
}

/**
 * Get saved location from localStorage
 */
export function getSavedLocation(): { key: string; location: GeocodingResult | null } {
  const key = localStorage.getItem('mausam_city') || 'mumbai';
  const locStr = localStorage.getItem('mausam_location');

  if (locStr) {
    try {
      return { key, location: JSON.parse(locStr) };
    } catch {
      return { key, location: getLocationByKey(key) || null };
    }
  }

  return { key, location: getLocationByKey(key) || null };
}

/**
 * Clear saved location from localStorage
 */
export function clearSavedLocation(): void {
  localStorage.removeItem('mausam_city');
  localStorage.removeItem('mausam_location');
}

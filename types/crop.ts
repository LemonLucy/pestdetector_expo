type CropData = {
    crop_information: {
      name: string;
      species: string;
      growth_stage: string;
    };
    pest_information: {
      pest_name: string;
      severity: string;
      pesticide: string;
    };
    disease_information: {
      disease_name: string;
      symptoms: string;
      severity: string;
      pesticide: string;
    };
    crop_health_information: {
      overall_health: string;
      recommended_action: string;
    };
    timestamp: string;
    crop_id: string;
    image_url?: string; // Add image_url as optional if it might not always exist
    healthColor?: string; // Optional property for health status color
  };
import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TechnologyStackForm = ({ formData, updateFormData, errors }) => {
  const frontendTechnologies = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nuxtjs', label: 'Nuxt.js' },
    { value: 'vanilla-js', label: 'Vanilla JavaScript' },
    { value: 'typescript', label: 'TypeScript' }
  ];

  const backendTechnologies = [
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'express', label: 'Express.js' },
    { value: 'django', label: 'Django' },
    { value: 'flask', label: 'Flask' },
    { value: 'spring', label: 'Spring Boot' }
  ];

  const databases = [
    { value: 'mysql', label: 'MySQL' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'redis', label: 'Redis' },
    { value: 'sqlite', label: 'SQLite' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'supabase', label: 'Supabase' },
    { value: 'dynamodb', label: 'DynamoDB' }
  ];

  const cloudPlatforms = [
    { value: 'aws', label: 'Amazon Web Services' },
    { value: 'gcp', label: 'Google Cloud Platform' },
    { value: 'azure', label: 'Microsoft Azure' },
    { value: 'vercel', label: 'Vercel' },
    { value: 'netlify', label: 'Netlify' },
    { value: 'heroku', label: 'Heroku' },
    { value: 'digitalocean', label: 'DigitalOcean' }
  ];

  const mobileTechnologies = [
    { value: 'react-native', label: 'React Native' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'ionic', label: 'Ionic' },
    { value: 'xamarin', label: 'Xamarin' },
    { value: 'swift', label: 'Swift (iOS)' },
    { value: 'kotlin', label: 'Kotlin (Android)' }
  ];

  const aiMlTechnologies = [
    { value: 'tensorflow', label: 'TensorFlow' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'scikit-learn', label: 'Scikit-learn' },
    { value: 'opencv', label: 'OpenCV' },
    { value: 'pandas', label: 'Pandas' },
    { value: 'numpy', label: 'NumPy' },
    { value: 'jupyter', label: 'Jupyter' }
  ];

  const addCustomTechnology = () => {
    if (formData?.customTechnology?.trim()) {
      const newTech = {
        value: formData?.customTechnology?.toLowerCase()?.replace(/\s+/g, '-'),
        label: formData?.customTechnology
      };
      updateFormData('otherTechnologies', [...formData?.otherTechnologies, newTech]);
      updateFormData('customTechnology', '');
    }
  };

  const removeCustomTechnology = (techToRemove) => {
    const filtered = formData?.otherTechnologies?.filter(tech => tech?.value !== techToRemove?.value);
    updateFormData('otherTechnologies', filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
          <Icon name="Code" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Technology Stack</h3>
          <p className="text-sm text-gray-600">Choose the technologies for your project</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Select
          label="Frontend Technologies"
          placeholder="Select frontend tech"
          options={frontendTechnologies}
          value={formData?.frontendTech}
          onChange={(value) => updateFormData('frontendTech', value)}
          multiple
          searchable
          clearable
          description="Choose your frontend framework/library"
        />

        <Select
          label="Backend Technologies"
          placeholder="Select backend tech"
          options={backendTechnologies}
          value={formData?.backendTech}
          onChange={(value) => updateFormData('backendTech', value)}
          multiple
          searchable
          clearable
          description="Choose your backend language/framework"
        />

        <Select
          label="Database"
          placeholder="Select database"
          options={databases}
          value={formData?.database}
          onChange={(value) => updateFormData('database', value)}
          multiple
          searchable
          clearable
          description="Choose your data storage solution"
        />

        <Select
          label="Cloud Platform"
          placeholder="Select cloud platform"
          options={cloudPlatforms}
          value={formData?.cloudPlatform}
          onChange={(value) => updateFormData('cloudPlatform', value)}
          multiple
          searchable
          clearable
          description="Choose your deployment platform"
        />

        <Select
          label="Mobile Technologies"
          placeholder="Select mobile tech"
          options={mobileTechnologies}
          value={formData?.mobileTech}
          onChange={(value) => updateFormData('mobileTech', value)}
          multiple
          searchable
          clearable
          description="For mobile app projects"
        />

        <Select
          label="AI/ML Technologies"
          placeholder="Select AI/ML tech"
          options={aiMlTechnologies}
          value={formData?.aiMlTech}
          onChange={(value) => updateFormData('aiMlTech', value)}
          multiple
          searchable
          clearable
          description="For AI/ML projects"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Technologies
        </label>
        <div className="flex space-x-2 mb-3">
          <Input
            type="text"
            placeholder="Enter custom technology"
            value={formData?.customTechnology}
            onChange={(e) => updateFormData('customTechnology', e?.target?.value)}
            className="flex-1"
            onKeyPress={(e) => e?.key === 'Enter' && addCustomTechnology()}
          />
          <Button
            variant="outline"
            iconName="Plus"
            onClick={addCustomTechnology}
            disabled={!formData?.customTechnology?.trim()}
          >
            Add
          </Button>
        </div>

        {formData?.otherTechnologies?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData?.otherTechnologies?.map((tech) => (
              <div
                key={tech?.value}
                className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{tech?.label}</span>
                <button
                  onClick={() => removeCustomTechnology(tech)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Setup Preferences
        </label>
        <div className="space-y-3">
          <Checkbox
            label="GitHub repository setup"
            checked={formData?.githubSetup}
            onChange={(e) => updateFormData('githubSetup', e?.target?.checked)}
            description="Automatically create and configure GitHub repository"
          />
          <Checkbox
            label="CI/CD pipeline"
            checked={formData?.cicdSetup}
            onChange={(e) => updateFormData('cicdSetup', e?.target?.checked)}
            description="Set up continuous integration and deployment"
          />
          <Checkbox
            label="Code quality tools"
            checked={formData?.codeQuality}
            onChange={(e) => updateFormData('codeQuality', e?.target?.checked)}
            description="Include linting, formatting, and testing tools"
          />
          <Checkbox
            label="Documentation template"
            checked={formData?.documentation}
            onChange={(e) => updateFormData('documentation', e?.target?.checked)}
            description="Generate README and documentation structure"
          />
        </div>
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Zap" size={20} className="text-purple-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-purple-900">Technology Tip</h4>
            <p className="text-sm text-purple-700 mt-1">
              Choose technologies that align with your team's skills and project goals. 
              Consider learning opportunities - mixing familiar tools with new technologies can be great for skill development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyStackForm;
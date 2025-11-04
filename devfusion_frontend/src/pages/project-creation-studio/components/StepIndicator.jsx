import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps, steps, onStepClick }) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (stepIndex, status) => {
    if (status === 'completed') return 'Check';
    return steps?.[stepIndex]?.icon;
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-white border-success';
      case 'current':
        return 'bg-primary text-white border-primary';
      case 'upcoming':
        return 'bg-gray-100 text-gray-400 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-400 border-gray-200';
    }
  };

  const getConnectorClasses = (stepIndex) => {
    return stepIndex < currentStep ? 'bg-success' : 'bg-gray-200';
  };

  return (
    <div className="w-full">
      {/* Mobile Step Indicator */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-semibold text-gray-900">{steps?.[currentStep]?.title}</h3>
          <p className="text-sm text-gray-600">{steps?.[currentStep]?.description}</p>
        </div>
      </div>
      {/* Desktop Step Indicator */}
      <div className="hidden lg:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps?.map((step, stepIndex) => {
              const status = getStepStatus(stepIndex);
              const isClickable = stepIndex <= currentStep;

              return (
                <li key={step?.id} className="relative flex-1">
                  <div className="flex items-center">
                    {/* Step Circle */}
                    <button
                      onClick={() => isClickable && onStepClick(stepIndex)}
                      disabled={!isClickable}
                      className={`
                        relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                        ${getStepClasses(status)}
                        ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
                      `}
                    >
                      <Icon 
                        name={getStepIcon(stepIndex, status)} 
                        size={20} 
                      />
                      {status === 'current' && (
                        <div className="absolute -inset-1 bg-primary/20 rounded-full animate-pulse" />
                      )}
                    </button>

                    {/* Step Content */}
                    <div className="ml-4 min-w-0 flex-1">
                      <button
                        onClick={() => isClickable && onStepClick(stepIndex)}
                        disabled={!isClickable}
                        className={`
                          text-left block w-full
                          ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                        `}
                      >
                        <p className={`
                          text-sm font-medium
                          ${status === 'current' ? 'text-primary' : 
                            status === 'completed' ? 'text-success' : 'text-gray-500'}
                        `}>
                          {step?.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 hidden xl:block">
                          {step?.description}
                        </p>
                      </button>
                    </div>

                    {/* Connector Line */}
                    {stepIndex < steps?.length - 1 && (
                      <div className="absolute top-5 left-10 w-full h-0.5 -ml-px">
                        <div className={`
                          h-full transition-all duration-300
                          ${getConnectorClasses(stepIndex)}
                        `} />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Current Step Details */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name={steps?.[currentStep]?.icon} size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {steps?.[currentStep]?.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {steps?.[currentStep]?.description}
              </p>
            </div>
          </div>
          
          {steps?.[currentStep]?.tips && (
            <div className="mt-4 pl-11">
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-2">Tips for this step:</p>
                <ul className="space-y-1 text-xs">
                  {steps?.[currentStep]?.tips?.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={12} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
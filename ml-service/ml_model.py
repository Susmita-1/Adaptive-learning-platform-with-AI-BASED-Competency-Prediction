# ml_model.py
import numpy as np
from typing import Dict, List, Optional

class IQPredictor:
    """IQ Level Prediction Model"""
    
    def __init__(self):
        self.base_iq = 100
        self.iq_range = (70, 160)
    
    def predict_competency(self, score: int, total: int, percentage: float, time_taken: int) -> str:
        """Predict competency level"""
        if score >= 8 and percentage >= 80 and time_taken <= 10:
            return "Advanced"
        elif score >= 5 and percentage >= 50:
            return "Intermediate"
        else:
            return "Beginner"
    
    def get_iq_recommendation(self, score: int, total: int, percentage: float, 
                               time_taken: int, category_performance: Dict = None) -> Dict:
        """Generate complete IQ recommendation"""
        
        # Calculate IQ score based on performance
        if percentage >= 90:
            iq_score = 135
            iq_level = "Genius Level"
            competency = "Advanced"
            description = "Exceptional cognitive abilities! You demonstrate outstanding problem-solving skills and quick learning capability."
            strengths = [
                "Exceptional analytical and reasoning abilities",
                "Advanced problem-solving skills",
                "Quick learning and adaptation",
                "High-level conceptual thinking"
            ]
            color = "#4CAF50"
            icon = "🧠"
            
        elif percentage >= 80:
            iq_score = 125
            iq_level = "Superior Intelligence"
            competency = "Advanced"
            description = "Above-average cognitive abilities. You show strong analytical skills and excellent comprehension."
            strengths = [
                "Strong analytical and critical thinking",
                "Excellent comprehension skills",
                "Good problem-solving abilities",
                "Quick grasp of new concepts"
            ]
            color = "#8BC34A"
            icon = "🎯"
            
        elif percentage >= 70:
            iq_score = 115
            iq_level = "High Average"
            competency = "Intermediate"
            description = "Good cognitive abilities. You have solid understanding and show consistent performance."
            strengths = [
                "Solid problem-solving skills",
                "Good understanding of concepts",
                "Consistent performance",
                "Able to handle moderate complexity"
            ]
            color = "#FFC107"
            icon = "📚"
            
        elif percentage >= 60:
            iq_score = 105
            iq_level = "Average"
            competency = "Intermediate"
            description = "Average cognitive abilities. You perform satisfactorily with basic to moderate complexity tasks."
            strengths = [
                "Satisfactory performance",
                "Able to grasp basic concepts",
                "Room for improvement"
            ]
            color = "#FF9800"
            icon = "⭐"
            
        elif percentage >= 50:
            iq_score = 95
            iq_level = "Low Average"
            competency = "Intermediate"
            description = "Developing cognitive abilities. More practice will help build stronger fundamentals."
            strengths = [
                "Basic understanding demonstrated",
                "Willingness to learn and improve"
            ]
            color = "#FF5722"
            icon = "🌱"
            
        else:
            iq_score = 85
            iq_level = "Needs Improvement"
            competency = "Beginner"
            description = "Significant room for improvement. Focus on building strong foundation in basic concepts."
            strengths = [
                "Learning potential identified",
                "Determination to improve"
            ]
            color = "#F44336"
            icon = "💪"
        
        # Time adjustment
        if time_taken <= 8 and percentage >= 70:
            iq_score += 5
        elif time_taken > 15 and percentage < 60:
            iq_score -= 3
        
        # Identify strengths and weaknesses from categories
        category_strengths = []
        category_weaknesses = []
        
        if category_performance:
            for category, data in category_performance.items():
                if data.get('percentage', 0) >= 80:
                    category_strengths.append(f"Excellent in {category}")
                elif data.get('percentage', 0) >= 70:
                    category_strengths.append(f"Strong in {category}")
                elif data.get('percentage', 0) <= 50:
                    category_weaknesses.append(f"Needs improvement in {category}")
                elif data.get('percentage', 0) <= 40:
                    category_weaknesses.append(f"Significant improvement needed in {category}")
        
        # Generate recommendations
        recommendations = self._generate_recommendations(competency, percentage, category_weaknesses)
        
        # Generate learning path
        learning_path = self._generate_learning_path(competency, percentage, category_weaknesses)
        
        # Generate next steps
        next_steps = self._generate_next_steps(competency, percentage, category_weaknesses)
        
        return {
            'iq_score': iq_score,
            'iq_level': iq_level,
            'competency_level': competency,
            'description': description,
            'strengths': strengths + category_strengths,
            'areas_for_improvement': category_weaknesses if category_weaknesses else ["Continue regular practice to maintain and improve"],
            'color': color,
            'icon': icon,
            'recommendations': recommendations,
            'learning_path': learning_path,
            'next_steps': next_steps
        }
    
    def _generate_recommendations(self, competency: str, percentage: float, weaknesses: List[str]) -> List[Dict]:
        """Generate personalized recommendations"""
        recommendations = []
        
        # Main recommendation based on competency
        if competency == "Advanced":
            recommendations.append({
                'type': 'challenge',
                'title': 'Advanced Challenges',
                'description': 'You\'re ready for advanced concepts and complex problem-solving.',
                'actions': [
                    'Take advanced courses or certifications',
                    'Participate in academic competitions',
                    'Mentor other students',
                    'Work on challenging research projects'
                ]
            })
        elif competency == "Intermediate":
            recommendations.append({
                'type': 'growth',
                'title': 'Accelerate Your Learning',
                'description': 'Regular practice and focused effort will help you reach the advanced level.',
                'actions': [
                    'Practice 45 minutes daily',
                    'Focus on challenging problems',
                    'Join study groups',
                    'Review and learn from mistakes'
                ]
            })
        else:
            recommendations.append({
                'type': 'foundation',
                'title': 'Build Strong Foundation',
                'description': 'Focus on understanding basic concepts before moving to advanced topics.',
                'actions': [
                    'Start with basic concepts',
                    'Use visual learning resources',
                    'Practice with simple problems first',
                    'Consider getting a study buddy or tutor'
                ]
            })
        
        # Category-specific recommendations
        for weakness in weaknesses:
            if "Needs improvement in" in weakness:
                category = weakness.replace("Needs improvement in ", "")
                recommendations.append({
                    'type': 'category',
                    'title': f'Improve in {category}',
                    'description': f'Dedicated practice in {category} will boost your overall performance.',
                    'actions': [
                        f'Review {category} fundamentals',
                        f'Practice {category} problems daily',
                        f'Use {category}-specific learning resources',
                        f'Take practice tests in {category}'
                    ]
                })
        
        return recommendations
    
    def _generate_learning_path(self, competency: str, percentage: float, weaknesses: List[str]) -> Dict:
        """Generate structured learning path"""
        
        if competency == "Advanced":
            return {
                'short_term': [
                    'Master advanced concepts in your strong areas',
                    'Help peers with their learning',
                    'Take on complex projects'
                ],
                'medium_term': [
                    'Participate in advanced competitions',
                    'Start research or independent projects',
                    'Develop teaching materials'
                ],
                'long_term': [
                    'Become a subject matter expert',
                    'Mentor other students',
                    'Contribute to open-source educational projects'
                ]
            }
        elif competency == "Intermediate":
            return {
                'short_term': [
                    'Practice 45 minutes daily',
                    'Focus on weak areas identified above',
                    'Review incorrect answers'
                ],
                'medium_term': [
                    'Achieve 80%+ accuracy',
                    'Master difficult concepts',
                    'Take timed practice tests'
                ],
                'long_term': [
                    'Reach Advanced competency level',
                    'Excel in all categories',
                    'Help others learn'
                ]
            }
        else:
            return {
                'short_term': [
                    'Build strong foundation in basics',
                    'Learn core concepts thoroughly',
                    'Practice with simple problems'
                ],
                'medium_term': [
                    'Achieve 60%+ accuracy',
                    'Gain confidence in weak areas',
                    'Develop consistent study habits'
                ],
                'long_term': [
                    'Reach Intermediate level',
                    'Master all categories',
                    'Build lifelong learning habits'
                ]
            }
    
    def _generate_next_steps(self, competency: str, percentage: float, weaknesses: List[str]) -> List[str]:
        """Generate immediate next steps"""
        next_steps = []
        
        if competency == "Advanced":
            next_steps.extend([
                "Take a practice test to maintain your level",
                "Explore advanced topics in areas you're strong in",
                "Consider mentoring someone who is at an earlier stage"
            ])
        elif competency == "Intermediate":
            next_steps.extend([
                "Review the questions you got wrong",
                "Practice 30-45 minutes daily for the next week",
                "Focus on the categories that need improvement"
            ])
        else:
            next_steps.extend([
                "Start with basic concept review",
                "Set a goal to practice 20 minutes daily",
                "Use flashcards for key concepts",
                "Take a short practice test next week to track progress"
            ])
        
        # Add specific next steps for weak categories
        for weakness in weaknesses[:2]:  # Top 2 weaknesses
            if "Needs improvement in" in weakness:
                category = weakness.replace("Needs improvement in ", "")
                next_steps.append(f"Focus on improving {category} - start with fundamentals")
        
        return next_steps[:4]  # Return top 4 next steps

# Create singleton instance
iq_predictor = IQPredictor()
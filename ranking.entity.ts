/* 1️ Keep dynamic calculation (no new DB table used)

You don’t need ranking.entity.ts at all.

Your current RankingService already works perfectly: sums points per user per quiz.

The advantage: always up-to-date, no extra writes.

The disadvantage: slower if you have many scores or quizzes, because it recalculates every request.*/
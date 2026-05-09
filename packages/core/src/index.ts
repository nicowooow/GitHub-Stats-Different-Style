import {StatsOptions} from "@core/src/ports/StatsOptions";
import {UserStats} from "@core/src/ports/UserStats";
import {Octokit} from "@octokit/rest";

export async function generateStats(username: string, options: StatsOptions = {}): Promise<string> {
    const octokit = new Octokit({auth: process.env.GITHUB_TOKEN});

    // 1. Obtener datos básicos del usuario
    const {data: user} = await octokit.rest.users.getByUsername({username});

    // 2. Obtener repositorios para sumar las estrellas
    // Usamos paginate para asegurarnos de traer todos si tiene muchos
    const repos = await octokit.paginate(octokit.rest.repos.listForUser, {
        username,
        per_page: 100,
    });

    const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

    // 3. Mover el return después de definir stats
    const stats: UserStats = {
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        githubGists: user.public_gists,
        stars: totalStars // Usamos el cálculo de arriba
    };

    const theme = options.theme === 'light' ? 'light' : 'dark';
    const bg = theme === 'dark' ? '#0d1117' : '#ffffff';
    const text = theme === 'dark' ? '#ffffff' : '#0d1117';
    const accent = '#58a6ff';

    // 4. Retornar el SVG
    return `<svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="150" rx="12" fill="${bg}"/>
    <style>text{font:600 18px 'Segoe UI',sans-serif;}</style>
    <text x="25" y="35" fill="${text}" font-size="24">${username}</text>
    <text x="25" y="65" fill="${accent}" font-size="14">@${username}</text>
    
    <g text-anchor="middle" font-size="16" fill="${text}">
      <text x="90" y="105">${stats.publicRepos}</text><text x="90" y="125">Repos</text>
      <text x="200" y="105">${stats.followers}</text><text x="200" y="125">Followers</text>
      <text x="310" y="105">${stats.stars}</text><text x="310" y="125">Stars</text>
      <text x="420" y="105">${stats.githubGists}</text><text x="420" y="125">Gists</text>
    </g>
  </svg>`;
}

generateStats("nicowooow").then((stats) => {
    console.log(stats);
});

